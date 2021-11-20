//rotas do sistema de artigos

module.exports = (app) => {
    const artigosController = require('../controllers/artigos.controller');
    let router = require("express").Router();

    router.post('/', artigosController.criarArtigo);

    router.get("/", artigosController.buscarArtigos);

    router.get("/id", artigosController.buscarArtigoPorId);

    router.get("/titulo", artigosController.buscarArtigoPorTitulo);

    router.get("/publicados", artigosController.buscarArtigosPublicados);

    router.put("/:id", artigosController.atualizarArtigo);

    router.delete("/", artigosController.deletarTodosOsArtigos);

    router.delete("/:id", artigosController.deletarArtigo);

    app.use('/artigos', router);
}