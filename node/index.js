const express = require('express')
const mysql = require('mysql')
const app = express()
const port = process.env.APP_PORT || 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

let connection = mysql.createConnection(config)
connection.query(`INSERT INTO people (nome) VALUES ('Heitor')`)
connection.end()

app.get('/', (req, res) => {

  let connection = mysql.createConnection(config)
  connection.query(`SELECT nome FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(x => `<li>${x.nome}</li>`).join('') : ''}
      </ol>
    `)
  })
  connection.end()
})

app.listen(port, () => {
  console.log('Listen:', port);
})