const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");

// Agregue todas as rotas
router.use(userRoutes);

// Você pode adicionar mais rotas aqui conforme o aplicativo cresce
// router.use('/otherRoute', otherRoute);

module.exports = router;
