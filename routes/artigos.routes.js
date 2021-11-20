//rotas do sistema de artigos do

/*
GET
    obter todos os artigos--
    obter um artigo específico--
    obter todos os artigos publicados

POST
    criar um novo artigo

PUT
    Publicar meu artigo
    Alterar

DELETE
    Deletar uma artigo
*/

module.exports = (app) => {
    const artigosController = require('../controllers/artigos.controller');
    let router = require("express").Router();

    router.post('/', artigosController.criarArtigo);

    router.get("/", artigosController.buscarArtigos);

    router.get("/id", artigosController.buscarArtigoPorId);

    router.get("/titulo", artigosController.buscarArtigoPorTitulo);

    router.get("/publicados", artigosController.buscarArtigosPublicados);

    app.use('/artigos', router);
}