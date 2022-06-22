import express, { json } from 'express'
import Productos from '../container.js'

const cartRouter = express.Router();


const carts = new Productos("cart.json")

cartRouter.get('/', (req, res)=>{
  res.json(cart.getAll())
})


cartRouter.post('/', (req, res)=>{
    let obj = {...req.body, ...{productos: []}}
    res.json(carts.save(obj))
    
})

cartRouter.post('/:id/products', (req, res)=>{
    const product = req.body
    const cartID = req.params.id
    const cart = carts.getById(cartID)
    cart.product.push(product)

    const newObj = carts.editById(cart, cartID)
    res.json(newObj)
})



export default cartRouter; 