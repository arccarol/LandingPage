const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

const DB_FILE = './db.json';

app.use(cors());
app.use(bodyParser.json());

// POST /api/newsletter, pode mudar o nome
app.post('/api/newsletter', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email obrigatórios' });
  }

  // Lê o banco de dados (arquivo JSON)
  const data = JSON.parse(fs.readFileSync(DB_FILE));

  // Adiciona o novo registro
  data.push({ name, email, createdAt: new Date() });

  // Salva no arquivo
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({ message: 'Inscrição recebida com sucesso!' });
});

// GET opcional pode mudar o link da api 
app.get('/api/newsletter', (req, res) => { 
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
