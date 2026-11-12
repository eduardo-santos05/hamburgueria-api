import mongoose from 'mongoose'

let pedidoSchema = new mongoose.Schema({
    cliente: { 
        type: String, 
        required: [true, "O nome do cliente é obrigatório"], 
        trim: true 
    },
    itens: [
        {
            nome: { 
                type: String, 
                required: [true, "O item precisa de um nome"] 
            },
            preco: { 
                type: Number, 
                required: [true, "O item precisa de um preço / O preço não pode ser negativo"], 
                min: 0 
            },
            quantidade: { 
                type: Number, 
                min: [1, "A quantidade mínima é 1"], 
                default: 1 
            }
        }
    ],
    status: { 
        type: String,
        enum: {
            values: ["Recebido", "Preparando", "Entregue"],
            message: "{VALUE} não é um status válido"
        },
        default: "Recebido"
    }
})

let Pedido = mongoose.model("Pedido", pedidoSchema)

export default Pedido