const databaseConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const { dialect, connectionStringUrl } = databaseConfig;
const sequelizeOptions = { dialect };
const sequelizeDatabase = new Sequelize(connectionStringUrl, sequelizeOptions);

const database = {
    Sequelize,           // equivale a -> Sequelize: Sequelize
    sequelizeDatabase,   // equivale a -> sequelizeDatabase: sequelizeDatabase
};

const artigosModel = require("./artigos.model");
database.artigos = artigosModel(sequelizeDatabase, Sequelize);

module.exports = database;
