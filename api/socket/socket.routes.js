module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('chat templatePage', templatePage => {
            if (socket.templatePage) {
                socket.leave(socket.templatePage)
            }
            socket.join(templatePage)
            socket.templatePage = templatePage;
        })
        socket.on('chat newMsg', msg => {
            io.to(socket.templatePage).emit('chat addMsg', msg)
        })
        socket.on('chat typing', loggedUser => {

            io.to(socket.templatePage).emit('chat showTyping', loggedUser)
        })
    })
}