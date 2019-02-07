/*Query para buscar todos os corredores ligados ao clube*/

SELECT DISTINCT corredor.*
FROM participacao,
     corredor,
     clube,
     evento
WHERE clube.idClube = 8 AND clube.idClube = evento.idEvento
        AND evento.idEvento = participacao.idEvento
        AND participacao.idCorredor = corredor.idCorredor OR corredor.idClube = 8;

/*Query para busca na tabela de participações*/
SELECT participacao.idEvento, participacao.idCorredor, evento.idEvento
FROM participacao,
     clube,
     evento
WHERE clube.idClube=1 AND clube.idClube = evento.idEvento
  AND evento.idEvento = participacao.idEvento order by evento.idEvento;