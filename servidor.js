const express = require('express')

const {Server: HttpServer} = require('http')

const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"))

app.get('/',(req,res) => {
    res.send("OK")
})
let mensajes = []
io.on("connection", (socket) => {
    socket.emit('mensajesActualizados',mensajes)
    socket.on("borrarMensaje",() => {
        mensajes = []
        io.sockets.emit('mensajesActualizados',mensajes=[])
    })
    socket.on('nuevoMensaje',mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensajesActualizados',mensajes)
    })
    /*console.log("Usuario conectado: "+socket.id)

    socket.emit("Mi mensaje", "Este es mi mensaje desde el serv")

    socket.on("msg-cliente",data=>{
        console.log(`(server) recibi: ${data}`)
    })
    */
    io.sockets.emit("mi mensaje","Nueva conexion!")
})

const server = httpServer.listen(8080, () => {
    console.log(`Server conectado al ${server.address().port}`)
})