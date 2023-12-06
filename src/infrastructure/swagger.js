const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fintrackr API",
      version: "1.0.0",
      description: "Documentação da API do Fintrackr",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/routes/*.docs.js"], // Arquivos que contém as rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
