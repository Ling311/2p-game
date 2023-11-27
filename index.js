import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server);

var users = 0;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


io.on('connection', (socket) => {
  users++
  console.log('a user connected, users : ' + users);
  io.emit('number of users', users);

  socket.on('disconnect', () => {
    users--
    console.log('user disconnected, users : ' + users);
    io.emit('number of users', users);
  });

  socket.on('score increased', (Score1, Score2) => {
    io.emit('score increased', Score1, Score2);
    console.log('Score1: ' + Score1 + ' Score2: ' + Score2);
  });

  socket.on('bar1 pos', (x1, y1) => {
    io.emit('bar1 pos', x1, y1);
  });
  
  socket.on('bar2 pos', (x2, y2) => {
    io.emit('bar2 pos', x2, y2);
  });

  socket.on('ball pos', (Ballx, Bally) => {
    io.emit('ball pos', Ballx, Bally);
  });

  socket.on('ball speed', (BallSpeedX, BallSpeedY) => {
    io.emit('ball speed', BallSpeedX, BallSpeedY);
  });

  socket.on('checkboxstatus', (status) => {
    io.emit('checkboxstatus', status);
  });




});