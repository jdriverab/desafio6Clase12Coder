const express = require("express");
const apiRouter = require("./router");

const cors = require('cors')

const app = express()

const PORT = 8080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(express.static("./public"))
app.use('/public', express.static('./pages'))


app.use("/productos", apiRouter);

const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', err =>{
    console.log(`Error en servidor: ${err}`);
})

