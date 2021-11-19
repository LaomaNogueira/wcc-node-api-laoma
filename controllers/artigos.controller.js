//regras de negócio do sistema de artigos

const database = require('../models');
const tabelaArtigos = database.artigos;

//cria um novo artigo:
exports.create = (req, res) => {
    const artigo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado,
    };

    tabelaArtigos.create(artigo)
    .then(() => res.send("Artigo criado com sucesso!"))
    .catch((error) => {
        console.log(error);
        res.status(500).send("Ocorreu um erro ao salvar o artigo!");
    })
    
};

