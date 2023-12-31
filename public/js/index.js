const socket = io()

socket.on("mensajesActualizados", mensajes => {
    enviarMensaje(mensajes)
})

function enviarMensaje(mensajes, uri = false){
    const mensajeParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<li>${fecha} - ${autor}: ${texto}`
    })
    const listaMensajes = document.getElementById('listaMensajes')
    const mensajeHtml = `<ul>${mensajeParaMostrar.join('\n')}`
    listaMensajes.innerHTML = mensajeHtml
}
const botonSaludar = document.getElementById('botonEnviar')
const botonReiniciar = document.getElementById('botonReiniciar')

botonSaludar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    }
    else {
        document.write("Debe escribir algun mensaje!")
    }
})
botonReiniciar.addEventListener('click', () => {
    socket.emit("borrarMensaje")
    document.getElementById('listaMensajes')
    .innerHTML = ""
})