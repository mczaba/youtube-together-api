const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function() {
  console.log("server running on port 3000");
});

const io = require("socket.io")(server);
let ID = null;
let timer = null;

io.on("connection", function(socket) {
  console.log(socket.id);
  io.emit("initialize", {
    ID,
    timer
  });
  socket.on("playVideo", function() {
    io.emit("playVideo");
    console.log("play");
  });
  socket.on("pauseVideo", function() {
    io.emit("pauseVideo");
    console.log("pause");
  });
  socket.on("seekTo", function(data) {
    io.emit("seekTo", data);
  });
  socket.on("refreshTimer", function(time) {
    timer = time;
  });
  socket.on("changeID", function(data) {
    ID = data;
  });
});
