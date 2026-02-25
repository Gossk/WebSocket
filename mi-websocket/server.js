const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (message) => {
        console.log('Mensaje recibido:', message.toString());

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');