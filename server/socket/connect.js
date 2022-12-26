connectSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      transports: ["websocket"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connection made " + socket.id);
    socket.on("send_message", (data) => {
      console.log(`Sent fromm client to server :${JSON.stringify(data)}`);
      io.emit("receive_message", `Server sent ${JSON.stringify(data)}`);
    });

    socket.on("ping", (data) => {
      io.emit("pong", data.date);
      // console.log("Sent a pong");
    });
  });
  // io.on("ping", (socket) => {
  //   console.log("Got a ping");
  //   socket.emit("pong");
  // });
};

module.exports = connectSocket;
