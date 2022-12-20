const express = require("express");
const { Router } = express;

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
})

const data = [
    {id: 1,title: "Cebolla", thumbnail: "https://LaDireccion", precio:5000},
    {id: 2,title: "Lechuga",thumbnail: "https://LaDireccion2", precio:6000},
    {id: 3,title: "Ajo",thumbnail: "https://LaDireccion3",  precio: 7000}
]
const mainData = data;

const apiRouter = new Router();

apiRouter.get('/', (req, res)=>{

    //return res.render("index", data)
    return res.json(mainData)

});

apiRouter.get('/:id', async (req, res)=>{
    const {id} = req.params
    const idToFind = mainData.find(res => res.id == Number(id))
    if(!idToFind){
        return res.status("404").json({error: 'Producto no encontrado'})
    }

    return res.json(idToFind)

});

apiRouter.post('/', (req, res)=>{
    
    const {body} = req
    const idMaxim = Math.max(...mainData.map(res=> res.id))
    const idToAssign = idMaxim + 1
    
    const newData = {
        id: idToAssign,
        title: body.title,
        thumbnail: body.thumbnail,
        precio: body.precio
    }

    mainData.push(newData)

    io.sockets.emit('newProduct', newData)

    
      return res.status(201).json(newData)
    //return res.render("layouts/productLayout", mainData)
    
});

apiRouter.put('/:id', async (req, res)=>{
    const {body} = req
    const {id: idParams} = req.params

    const newData = {
        id: Number(idParams),
        title: body.title,
        thumbnail: body.thumbnail,
        precio: Number(body.precio)
    }

    const indexToFind = mainData.findIndex(res => res.id == Number(idParams))

    mainData[indexToFind] = newData

    res.send(mainData);
});

apiRouter.delete('/:id', async (req, res)=>{
    const {id:idParams} = req.params
    const result = mainData.find(res => res.id == Number(idParams))

    const indexToDelete = mainData.indexOf({id: idParams})

    if(!result){
        return res.status("404").json({error: 'Producto no encontrado'})
    }

    mainData.splice(indexToDelete,1)

    //res.send(mainData);

    res.status("204").json({response: 'Producto eliminado'})
});


module.exports = apiRouter;