let mainForm = document.getElementById('main-form');
console.log(mainForm);

var note = document.getElementById('msg-area');


mainForm.addEventListener("submit", (elem, ev) => {
    event.preventDefault();
    let id = document.getElementById('input-id');
    id = id.value;
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost/Orientek/sync/upload.php');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.addEventListener("load", () => {
        if (req.status === 200) {
            let data = JSON.parse(req.responseText);
            console.log(req.responseText);
            console.log(data);
            for(let i in data){
                insertCorredores(data[i],i);
            }

        }
    });
    req.addEventListener("progress", (ev) => {
        console.log(ev)
    });
    req.addEventListener('error', (evt) => {
        console.log(evt)
    });
    req.send(`id=${id}`);
});

/*
function escreveCorredores(corredores) {
    let db;
    let request = indexedDB.open("corredores");
    request.onerror = function (event) {
        console.error('Error in IndexedDB');
        console.log(event);
    };
    request.onsuccess = function (event) {
        db = request.result;
        let idbTransaction = db.transaction("corredores", "readwrite").objectStore('corredores');
        for (let i = 0; i < corredores.length; i++) {
            idbTransaction.add(corredores[i]);
        }
        idbTransaction.transaction.onerror = () => {
            console.error('error');
            console.log(event);
        }
    };

    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("corredores");
        objectStore.transaction.oncomplete = function (event) {
            // Armazenando valores no novo objectStore.
            console.log('baum');
            var corredoresObjectStore = db.transaction("corredores", "readwrite").objectStore("corredores");
            for (let i = 0; i < corredores.length; i++) {
                console.log(corredores[i]);
                corredoresObjectStore.add(corredores[i]);
            }
        };
    };
}

function insert(dbname, data) {
    let idbTransaction = db.transaction(dbname, "readwrite").objectStore('corredores');
    for (let row in data) {
        idbTransaction.add(row);
    }

}
*/
function insertCorredores(data, objectStoreName) {
    // open a read/write db transaction, ready for adding the data
    var transaction = db.transaction([objectStoreName], "readwrite");
    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function (event) {
        console.log('%cTransaction completed.', dbLogStyles);
    };
    transaction.onerror = function (event) {
        console.error('Transaction not opened due to error. Duplicate items not allowed.');
    };
    // create an object store on the transaction
    var objectStore = transaction.objectStore(objectStoreName);
    // make a request to add our newItem object to the object store
    let deleteReq = objectStore.clear();
    deleteReq.onsuccess = (event) => {
        console.log('%cDeleted', dbLogStyles);
        for (let i = 0; i < data.length; i++) {
            let objectStoreRequest = objectStore.add(data[i]);
            objectStoreRequest.onsuccess = function (event) {
                console.log('inserted item: ' + data[i]);
            }

        }
    }
}

