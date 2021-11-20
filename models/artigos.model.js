module.exports = (sequelizeDatabase, Sequelize) => {
    const Artigo = sequelizeDatabase.define("artigos", {
        titulo: {
            type: Sequelize.STRING,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Artigo em construção...",
        },
        publicado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    return Artigo;
}