const db = require('./cnx')

async function listarCursos() {
    await db.connect()
    let resultado = await db.query('select * from vw_agendamentos_detalhados')
    console.log(resultado.rows)
}

listarCursos()