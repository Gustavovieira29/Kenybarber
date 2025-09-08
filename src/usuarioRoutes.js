// usuarioRoutes.js - CORRIGIDO

const express = require("express");
const router = express.Router();
const db = require("./db"); // Sua conexão Sequelize

// CREATE - Inserir usuário
router.post("/usuarios", async (req, res) => {
  // CORREÇÃO: Adicionados os campos obrigatórios senha e telefone
  const { nome_completo, email, senha, telefone } = req.body;
  try {
    const result = await db.query(
      // CORREÇÃO: Adicionadas as colunas na query SQL
      'INSERT INTO usuarios (nome_completo, email, senha, telefone) VALUES (?, ?, ?, ?) RETURNING id',
      {
        replacements: [nome_completo, email, senha, telefone],
        type: db.QueryTypes.INSERT
      }
    );
    
    const insertId = result[0][0].id;
    res.status(201).json({ id: insertId, nome_completo, email, telefone }); // Removido senha da resposta por segurança

  } catch (err) {
    // O erro real do banco de dados será exibido no seu terminal.
    console.error("ERRO DETALHADO:", err);
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
  // CORREÇÃO: Adicionados os campos para atualização
  const { nome_completo, email, senha, telefone } = req.body;
  try {
    await db.query("UPDATE usuarios SET nome_completo = ?, email = ?, senha = ?, telefone = ? WHERE id = ?", {
      replacements: [nome_completo, email, senha, telefone, id],
      type: db.QueryTypes.UPDATE,
    });
    res.json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.error("ERRO DETALHADO:", err);
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
  } catch (err)
    {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
});

module.exports = router;