require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração do Banco de Dados
mongoose.connect(process.env.MONGODB_URL);

// Rotas
const tarefasRoutes = require("./routes/tarefas");
app.use(tarefasRoutes);

// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
// 1) Conexão com Mongo usando URL
// 2) Criar o modelo de Task/Tarefa
// 3) As rotas GET, POST, PUT e DELETE
