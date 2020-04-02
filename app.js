const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function() {
  console.log("server running on port 3000");
});

const io = require("socket.io")(server);

io.on("connection", function(socket) {
  var room = socket.handshake["query"]["r_var"];
  socket.join(room);
  console.log("user joined room #" + room);
  if (io.sockets.adapter.rooms[room].ID || io.sockets.adapter.rooms[room].timer) {
    io.to(room).emit("initialize", {
      ID: io.sockets.adapter.rooms[room].ID,
      timer: io.sockets.adapter.rooms[room].timer
    });
  }
  socket.on("playVideo", function() {
    io.to(room).emit("playVideo");
  });
  socket.on("pauseVideo", function() {
    io.to(room).emit("pauseVideo");
  });
  socket.on("seekTo", function(data) {
    io.to(room).emit("seekTo", data);
  });
  socket.on("refreshTimer", function(time) {
    io.sockets.adapter.rooms[room].timer = time;
  });
  socket.on("changeID", function(data) {
    io.sockets.adapter.rooms[room].ID = data;
    io.to(room).emit("changeID", data);
  });
  socket.on("messageSent", function(data) {
    io.to(room).emit("messageSent", data);
  })
});
