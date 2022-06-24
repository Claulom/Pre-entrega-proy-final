import express from 'express'
import Productos from '../container.js'

const carts = new Productos("cart.txt")
const product = new Productos("productos.txt")
const cartRouter = express.Router();



cartRouter.post('/', (req, res)=>{
  const carrito = { productos: [product]};
  const carritos = carts.getAll();
  const date = new Date()
  carrito.timestamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleString()
  const cartId = carritos.map(p => p.id);
  carrito.id = Math.max(...cartId) +1;
  carritos.save(carrito)
  res.json(carrito)
})

cartRouter.get('/:id/productos', (req, res)=>{
  const id = Number(req.params.id)
  const carritos = carts.getAll()
  const carrito = carritos.find(prod => prod.id === id)
  if(carrito == undefined){
    res.send({error: 'Carrito no encontrado'})
  }else{
    res.json( carrito.productos)
  }
})

cartRouter.post('/:id/productos', (req, res) =>{
  const product = req.body
  const id = Number(req.params.id)
  const carritos = carts.getAll()
  const carrito = carritos.find(prod => prod.id === id)
  if(carrito == undefined){
    res.send({error: 'Carrito no encontrado'})
  }else{
    carts.save(product);
  }
})

export default cartRouter; 