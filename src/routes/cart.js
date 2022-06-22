import express from 'express'
import Productos from '../container.js'

const carts = new Productos("cart.txt")
const cartRouter = express.Router();

cartRouter.get('/', (req, res)=>{
  carts.getAll()
  .then(data => res.send (data))
})

cartRouter.post('/', (req, res)=>{
    let obj = {...req.body, ...{ productos: []}}
    res.json(carts.save(obj))    
})

cartRouter.post('/:id/products', (req, res)=>{
    const product = req.body
    const cartID = req.params.id
    const cart = carts.getById(cartID)
    cart.products.push(product)

    const newObj = carts.editById(cart, cartID)
    res.json(newObj)
})



export default cartRouter; 