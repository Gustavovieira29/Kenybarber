const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rota inicial (home)
app.get('/', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à Kenybarber!' })
})

// Rota de detalhes da barbearia
app.get('/barbearia', (req, res) => {
  res.json({
    nome: 'Kenybarber',
    endereco: 'Rua Exemplo, 123',
    telefone: '(99) 99999-9999',
    horario_funcionamento: '08:00 às 20:00',
    servicos: ['Corte', 'Barba', 'Sobrancelha']
  })
})

// Rota para listar profissionais
app.get('/profissionais', (req, res) => {
  res.json([
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' }
  ])
})

// Rota para listar horários disponíveis (exemplo fixo)
app.get('/horarios', (req, res) => {
  res.json([
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ])
})

// Rota de agendamento
app.post('/agendar', (req, res) => {
  const { profissional, data, horario } = req.body
  if (!profissional || !data || !horario) {
    return res.status(400).json({ erro: 'Preencha todos os campos!' })
  }
  // Aqui você pode salvar no banco ou processar como quiser
  console.log('Agendamento:', { profissional, data, horario })
  res.json({ mensagem: 'Agendamento realizado com sucesso!' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})