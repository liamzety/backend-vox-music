"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSockets = void 0;
const connectSockets = (io) => {
    io.on('connection', socket => {
        socket.on('chat connectRoom', roomId => {
            if (socket.roomId) {
                socket.leave(socket.roomId);
            }
            socket.join(roomId);
            socket.roomId = roomId;
        });
        socket.on('chat newMsg', msg => {
            io.to(socket.roomId).emit('chat addMsg', msg);
        });
        socket.on('chat typing', loggedUser => {
            io.to(socket.roomId).emit('chat showTyping', loggedUser);
        });
    });
};
exports.connectSockets = connectSockets;
//# sourceMappingURL=socket.routes.js.map