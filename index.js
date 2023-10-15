import express from 'express'
const app = express();
import http from 'http'
const server = http.createServer(app);
import path from 'path';
import { Server } from 'socket.io';
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg, name) => {
    io.emit('chat message', msg, name);
  });
});

server.listen(3000, '192.168.1.47', () => {
  console.log('listening on *:3000');
});