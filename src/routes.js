const express = require("express");
const path = require("path");
const router = express.Router();

const carro = require("./carro.json");

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


router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});


module.exports = router;