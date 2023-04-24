
const {Router} = require("express")
const Tarefa = require("../models/tarefa")

const router = Router();




router.post("/tarefas", async (req, res) => {
    try {
      // Coletar os dados do body
      const { titulo, descricao, status } = req.body;
      // Criando um novo documento do Mongo
      const tarefa = new Tarefa({ titulo, descricao, status });
      // Inserir o documento na coleção tarefas
      await tarefa.save();
      res.status(201).json(tarefa);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  //Listagem de todas as tarefas(Get)
  router.get("/tarefas", async (req, res) => {
    // Realiza uma busca de todos os documentos na coleção
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  });
  // Listagem de uma Tarefa(GET)
  router.get("/tarefas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // Realiza uma busca especifica por um documento
      const taskEncontrada = await Tarefa.findById(id);
      if (taskEncontrada) {
        // Responde com o documento encontrado
        res.status(201).json(taskEncontrada);
      } else {
        // Notifica o erro exatamente
        res.status(404).json({ message: "Tarefa não encontrada" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  // Atualização de uma tarefa(PUT)
  router.put("/tarefas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, status } = req.body;
      // Caso encontre o id, realiza a atualização
      // Retorna o objeto encontrado
      const updateTask = await Tarefa.findByIdAndUpdate(id, {
        titulo,
        descricao,
        status,
      });
      if(updateTask){
          res.status(201).json({message: "Tarefa Editada"})
      }else{
          res.status(404).json({message: "Tarefa não encontrada"})
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  // Remoção de uma tarefa (DELETE)
  router.delete("/tarefas/:id", async (req,res)=>{
      try{
          //Checa se a tarefa existe, e então remove do banco
          const {id} = req.params
          const deletarTarefa = await Tarefa.findByIdAndRemove(id)
          const tarefasRestante = await Tarefa.find()
          if(deletarTarefa){
              res.json({message: "Tarefa excluida" , tarefasRestante})
          }else{
              res.status(404).json({message : "Um erro aconteceu"})
          }
      }catch(err){
          console.log(err);
          res.status(500).json({ message: "Um erro aconteceu." });
      }
  })

  module.exports = router;