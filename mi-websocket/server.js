const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos
app.use(express.static("public"));

// WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
    // reenviar mensaje a todos
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});