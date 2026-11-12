import Pedido from './Pedido.js'
import mongoose from './conexao.js'
import express from 'express'

const router = express()
const port = 3000

router.use(express.json())

router.get("/pedidos", async (req, res) => {
    try {
        let pedidos = await Pedido.find()
        res.send(pedidos)
    } catch (erro) {
        res.status(500).send({ erro: erro.message })
    }
})

router.get("/pedidos/:id", async (req, res) => {
    try {
        let pedido = await Pedido.findById(req.params.id)
        if (pedido === null) {
            return res.status(404).send({ erro: "Pedido não encontrado" })
        }
        res.send(pedido)
    } catch (erro) {
        res.status(400).send({ erro: erro.message })
    }
})

router.post("/pedidos", async (req, res) => {
    try {
        let pedido = await Pedido.create(req.body)
        res.status(201).send(pedido)
    } catch (erro) {
        res.status(400).send({ erro: erro.message })
    }
})

router.put("/pedidos/:id", async (req, res) => {
    try {
        let pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body)
        if (pedido === null) {
            return res.status(404).send({ erro: "Pedido não encontrado" })
        }
        return res.send({ mensagem: "Pedido atualizado" })
    } catch (erro) {
        res.status(400).send({ erro: erro.message })
    }
})

router.delete("/pedidos/:id", async (req, res) => {
    try {
        let pedido = await Pedido.findById(req.params.id)
        if (pedido === null) {
            return res.status(404).send({ erro: "Pedido não encontrado" })
        }
        if (pedido.status === "Entregue") {
            return res.status(400).send({ erro: "Pedido já entregue não pode ser removido" })
        }
        await Pedido.findByIdAndDelete(req.params.id)
        return res.send({ mensagem: "Pedido removido" })
    } catch (erro) {
        res.status(400).send( { erro: erro.message })
    }
})

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
