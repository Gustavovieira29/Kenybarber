// index.js - VERSÃO CORRETA E COM DIAGNÓSTICO

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const router = require('./routes');
const usuarioRoutes = require('./usuarioRoutes');
const db = require('./db.js');

// Middleware para interpretar JSON
app.use(express.json());

// *****************************************************************
// ** DIAGNÓSTICO: Este código vai "espiar" todas as requisições **
// *****************************************************************
app.use((req, res, next) => {
  console.log(`[LOG] Requisição recebida: Método=${req.method}, URL=${req.originalUrl}`);
  next();
});
// *****************************************************************

// Pasta pública para arquivos estáticos (CSS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de páginas HTML (/, /inicio, /agenda)
app.use('/', router);

// Rotas da API de usuários (é aqui que mora o /api/usuarios)
app.use('/api', usuarioRoutes);

// Rota da API de agendamentos
app.get('/api/agendamentos', async (req, res) => {
  try {
    const resultados = await db.query(`SELECT id_agendamento AS id, cliente AS nome, inicio_agendado AS data FROM vw_agendamentos_detalhados`, {
      type: db.QueryTypes.SELECT
    });
    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Tratador de erro 404 - DEVE SER A ÚLTIMA COISA
app.use((req, res) => {
  console.log(`[LOG] Nenhuma rota encontrada para ${req.method} ${req.originalUrl}. Enviando 404.`);
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Inicia o servidor
db.authenticate()
  .then(() => {
    console.log('✅ Conectado ao PostgreSQL!');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:', err);
  });