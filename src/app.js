import express from 'express';
import Router from 'express'
import productRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import __dirname from './utils.js'

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})
const router = Router();
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );


app.use(express.json())
app.use(express.urlencoded({extended: true}))

  app.get('/', (req, res)=>{
    res.sendFile( __dirname +'/public/index.html')
})  


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter) 