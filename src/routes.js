// routes.js - VERSÃO CORRETA E LIMPA

const express = require("express");
const path = require("path");
const router = express.Router();

// Rota inicial -> exibe login.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Rota inicio -> exibe inicio.html
router.get("/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "inicio.html"));
});

router.get("/agenda", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "view.html"));
});

// NÃO COLOQUE O TRATADOR DE 404 AQUI

module.exports = router;