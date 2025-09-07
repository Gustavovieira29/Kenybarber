// usuarioRoutes.js - CORRIGIDO

const express = require("express");
const router = express.Router();
const db = require("./db"); // Sua conexão Sequelize

// CREATE - Inserir usuário
router.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;
  try {
    // Para inserir e pegar o ID, o ideal seria usar Models do Sequelize,
    // mas com query crua para PostgreSQL, você pode usar a cláusula RETURNING.
    const result = await db.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?) RETURNING id',
      {
        replacements: [nome, email],
        type: db.QueryTypes.INSERT
      }
    );
    // A resposta pode variar um pouco dependendo do driver.
    // 'result' será um array.
    const insertId = result[0][0].id;
    res.status(201).json({ id: insertId, nome, email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar usuário." });
  }
});

// READ - Buscar todos
router.get("/usuarios", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM usuarios", {
      type: db.QueryTypes.SELECT,
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuários." });
  }
});

// READ - Buscar 1 usuário por ID
router.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE id = ?", {
      replacements: [id],
      type: db.QueryTypes.SELECT,
    });
    if (result.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuário." });
  }
});

// UPDATE - Atualizar usuário
router.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    await db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", {
      replacements: [nome, email, id],
      type: db.QueryTypes.UPDATE,
    });
    res.json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
});

// DELETE - Remover usuário
router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM usuarios WHERE id = ?", {
      replacements: [id],
      type: db.QueryTypes.DELETE,
    });
    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
});

module.exports = router;