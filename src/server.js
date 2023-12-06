// src/server.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./infrastructure/swagger");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./infrastructure/database");

const indexRoutes = require("./routes/indexRoutes"); // Importa todas as rotas

app.use(express.json());
app.use("/api/v1", indexRoutes); // Registra todas as rotas com um prefixo '/api/v1'

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Rota para a documentação da API

// Middleware de tratamento de erros (opcional, mas recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

sequelize.sync().then(() => {
  console.log("Database synced");
  // Aqui você inicia o servidor
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
