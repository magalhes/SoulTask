const {model, Schema} = require("mongoose")
//titulo, descricao,status(finalizada/pendente)
const Tarefa = model(
    "tarefa",
     new Schema({
        titulo:{
            type:String, //String, Number, Boolean
            required:true,
        },
        descricao:{
            type:String,
            required: true,
        },
        status:{
            type: String,           
            default: "Pendente", // finalizada
        },      
     })
     );

     module.exports = Tarefa;