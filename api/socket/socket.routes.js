module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat connectRoom', roomId => {
            console.log('Room connected.', roomId)
            if (socket.roomId) {
                socket.leave(socket.roomId)
            }
            socket.join(roomId)
            socket.roomId = roomId;
        })
        socket.on('chat newMsg', msg => {
            io.to(socket.roomId).emit('chat addMsg', msg)
        })
        socket.on('chat typing', loggedUser => {

            io.to(socket.roomId).emit('chat showTyping', loggedUser)
        })
    })
}