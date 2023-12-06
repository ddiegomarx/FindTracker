// src/infrastructure/database.js

const { Sequelize } = require("sequelize");

// Configuração do banco de dados com SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

module.exports = sequelize;
