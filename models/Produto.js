const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Produto = new Schema({
    cod_produto: {
        type: String,
        required: true
    },
    desc_produto: {
        type: String,
        required: true
    },
    peso_mp: {
        type: String,
        required: true
    },
    peso_produto: {
        type: String,
        required: true
    },
    Etapa1: {
        type: String,
        required: true
    },
    Etapa2: {
        type: String,
        required: true
    },
    Etapa3: {
        type: String,
        required: true
    },
    Etapa4: {
        type: String,
        required: true
    },
    Etapa5: {
        type: String,
        required: true
    },
    Etapa6: {
        type: String,
        required: true
    },
    Etapa7: {
        type: String,
        required: true
    },
    Etapa8: {
        type: String,
        required: true
    },
    Etapa9: {
        type: String,
        required: true
    },
    date_mp: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    }
    
})

mongoose.model("produtos", Produto)