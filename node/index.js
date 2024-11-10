const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: 3306
}
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values ('Marcos Augusto'), ('Curso FullCycle')`
connection.query(sql)

app.get('/', async (req, res) =>{
    let html = '<h1>Full Cycle Rocks!</h1>\n\n<h4> - Lista de nomes cadastrada no banco de dados. </h4><ul>';
    const connection = mysql.createConnection(config)
    const pessoas = await obterPessoas(connection)
    pessoas.forEach((row) => {
      html += `<li>${row.name}</li>`;
    });
    html += '</ul>';

    connection.end()
    res.send(html);
})

app.listen(port, () => {
    console.log('Roando aplicação na porta ' + port)
})

function obterPessoas(connection) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM people';

      connection.query(sql, (err, results) => {
        if (err) {
          reject('Erro ao realizar a consulta: ' + err.stack);
        } else {
          resolve(results);
        }
      });
    });
  }