const databaseConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelizeOptions = { dialect: databaseConfig.dialect };
const sequelizeDatabase = new Sequelize(databaseConfig.connectionStringUrl, sequelizeOptions);

const database = {
    Sequelize,           // equivale a -> Sequelize: Sequelize
    sequelizeDatabase,   // equivale a -> sequelizeDatabase: sequelizeDatabase
};

const artigosModel = require("./artigos.model");
database.artigos = artigosModel(sequelizeDatabase, Sequelize);

module.exports = database;
//const Op = Sequelize.Op;
