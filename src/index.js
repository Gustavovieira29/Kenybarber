const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const router = require('./routes')
const db = require('./db.js'); // Sequelize

app.use(express.static(path.join(__dirname, 'public')))

// Rota da API deve vir ANTES do router
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


app.use(router)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})