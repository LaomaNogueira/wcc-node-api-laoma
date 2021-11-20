//regras de negócio do sistema de artigos

const database = require('../models');
const tabelaArtigos = database.artigos;


exports.criarArtigo = (req, res) => {
    //desestruturação de objeto = transforma as propriedades do objeto em variáveis:
    const { titulo, descricao, publicado } = req.body;
    const artigo = {
        titulo,      //titulo: titulo
        descricao,   //descricao: descricao
        publicado,   //publicado: publicado
    };

    if (!titulo) {
        return res
            .status(400)
            .send( {message: "O artigo precisa conter ao menos o título definido!"} );
    }

    tabelaArtigos.create(artigo)
    .then(() => res.send( {message: "Artigo criado com sucesso!"} ))
    .catch((error) => {
        console.log(error);
        res.status(500).send( {message: "Ocorreu um erro ao salvar o artigo!"} );
    })
};


exports.buscarArtigos = (req, res) => {
    tabelaArtigos.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
        console.log(error);
        res.status(500).send( {message: "Ocorreu um erro ao obter os artigos!"} );
    })
};


exports.buscarArtigoPorId = (req, res) => {
    const { id: idArtigo } = req.query;
    if (!idArtigo) {
        res.status(400).send({ message: `Não foi possível buscar um artigo, pois o id não foi informado` })
    }

    tabelaArtigos.findByPk(idArtigo)
    .then((data) => {
        if (!data) {
            res.status(404).send({ message: `Não foi possível encontrar nenhum artigo com id = ${idArtigo}` })
        }
        res.send(data)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send( {message: "Ocorreu um erro ao obter o artigo!"} );
    })
};


exports.buscarArtigoPorTitulo = async (req, res) => {
    try {
        const { titulo: tituloArtigo } = req.query;  //titulo: tituloArtigo está renomeando a propriedade titulo, para tituloArtigo
        if (!tituloArtigo) {
            res.status(400).send({ message: `Não foi possível buscar um artigo, pois o titulo não foi informado` })
        }

        const artigo = await tabelaArtigos.findOne({ 
            where: { titulo: tituloArtigo }, 
        });

        if(!artigo) {
            res
            .status(404)
            .send({ message: `Não foi encontrado nenhum artigo com título = ${tituloArtigo}` })
        }
        res.send(artigo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: `Ocorreu um erro ao obter o artigo com título = ${tituloArtigo}` });
    }
};


exports.buscarArtigosPublicados = (req, res) => {
    tabelaArtigos.findAll({ where: [{ publicado: true }] })
    .then((data) => {
        if(!data) {
            res.status(404).send({ message: "Não existe nenhum artigo publicado" })
        }

        res.send(data)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Ocorreu um erro ao obter os artigos publicados!" });
    })
};


exports.atualizarArtigo = (req, res) => {
    const { id: idArtigo } = req.params;    //equivale: const idArtigo = req.params.id
    const { body: atualizacoes } = req;     //equivale: const atualizacoes = req.body
    const consulta = { where: { id: idArtigo }, returning: true }  //flag returning retorna os itens que ele atualizou

    tabelaArtigos.update(atualizacoes, consulta)
    .then((data) => {

        if (data[0] === 0) {
            res.status(404).send({ message: `Não foi encontrado nenhum artigo com id = ${idArtigo}` })
        }

        res.send(data[1])
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send( {message: "Ocorreu um erro ao atualizar o artigo!"} );
    })
};


exports.deletarArtigo = (req, res) => {
    const { id: idArtigo } = req.params;    //equivale: const idArtigo = req.params.id

    tabelaArtigos.destroy({ where: { id: idArtigo } })
    .then((data) => {

        if (data === 0) {
            res.status(404).send({ message: `Não foi encontrado nenhum artigo com id = ${idArtigo}` });
        }

        console.log(data);
        res.send({ message: "Artigo deletado com sucesso!" });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Ocorreu um erro ao deletar o artigo!" });
    })
};


exports.deletarTodosOsArtigos = (req, res) => {

    tabelaArtigos.destroy({ where: {}, truncate: false }) //truncate: false -> destrói os dados, mas não destrói a estrutura da tabela
    .then((data) => {
        res.send({ message: `Foram deletados ${data} artigos` })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Ocorreu um erro ao deletar os artigos!" });
    })
};





/*
Exemplo:
const desestruturação = () => {
    const objExemplo = { id: 1 }; 

    //renomear por desestruturação
    const { id: idObject } = objExemplo;
    
    //atribuir valor por desestruturação
    const { name = "N/A"} = objExemplo;
};
*/