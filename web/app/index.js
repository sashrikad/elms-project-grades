const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { exec } = require('child_process');
const player = require('play-sound')(opts = {})


app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    
    player.play(`./${msg}.mp3`, function (err) {
        if (err){
            console.log(err);
        }else{
            console.log("Audio finished");
            io.emit('message', `${msg} played`);
        }
       
      });
  });

});

server.listen(80, () => {
  console.log('listening on *:80');
});