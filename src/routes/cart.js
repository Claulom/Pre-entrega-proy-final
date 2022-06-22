import express from 'express'
import Productos from '../container.js'

const router = express.Router();


const cart = new Productos("cart.json")

router.get('/', (req, res)=>{
    res.send(cart.items)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);
    
    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parámetro debe ser un número' });
    }
    
    if (idNumber > cart.items.length) {
        return res.status(400).send({ error: 'El parámetro está fuera de rango' });
    }
    
    if (idNumber < 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }
    
    const cart = await cart.isInCart(idNumber);
    
    if (!cart) {
        return res.status(400).send({ error: `El producto con el id: ${id} no existe` });
    }
    
    return res.send(cart)
})

router.post('/', async (req, res)=>{
    const { title, price, thumbnail, description, code, stock } = req.body;
    
    if (!title || !price|| !thumbnail) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }
    
    await cart.addItem({ title, price, thumbnail, description, code, stock });

    return res.send({ message: 'Producto agregado exitosamente'})
    
})


router.put('/:id', (req, res)=>{
    const idx = this.isInCart.findIndex(p => p.id == id)

    if(idx === -1){
        res.send('El producto que desea modificar no existe')
    }else{
        this.isInCart.splice(idx, 1, cart)
        res.json(cart)
    } 
})

router.delete('/id', (req,res)=>{
        const idx = this.removeItem.findIndex(p => p.id == id)

        if(idx === -1){
            res.send('El producto que desea eliminar no existe')
        }else{
            this.removeItem.splice(idx, 1)
            res.json(`Se elimino el producto con id: ${id}`)
        } 
}) 
export default router; 