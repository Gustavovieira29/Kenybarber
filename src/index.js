const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const router = require('./routes');           
const usuarioRoutes = require('./usuarioRoutes'); 
const db = require('./db.js');                

// Middleware para interpretar JSON no body
app.use(express.json());

// Pasta pública (se você tiver HTML, CSS, JS estáticos)
app.use(express.static(path.join(__dirname, 'public')));

// Suas rotas gerais
app.use(router);

// Rotas CRUD de usuário ficam em /api/usuarios
app.use(usuarioRoutes);

// Rota de agendamentos
app.get('/api/agendamentos', async (req, res) => {
  try {
    const resultados = await db.query(`
      SELECT 
        id_agendamento AS id,
        cliente AS nome,
        inicio_agendado AS data
      FROM vw_agendamentos_detalhados
    `, {
      type: db.QueryTypes.SELECT
    });
    
    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// 🟢 Só inicia o servidor se conectar ao banco
db.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL!');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:', err);
  });
