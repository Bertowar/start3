const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MP = new Schema({
    cod_mp: {
        type: String,
        required: true
    },
    desc_mp: {
        type: String,
        required: true
    },
    espesura_mp: {
        type: String,
        required: true
    },
    comprimento_mp: {
        type: String,
        required: true
    },
    custo_mp: {
        type: String,
        required: true
    },
    date_mp: {
        type: Date,
        default: Date.now()
    }
    
})

mongoose.model("mp", MP)