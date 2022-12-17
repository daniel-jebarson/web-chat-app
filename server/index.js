const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});
io.on("connection", (socket) => {
  console.log("Connection made " + socket.id);
  socket.on("send_message", (data) => {
    console.log(`Sent fromm client to server :${JSON.stringify(data)}`);
    io.emit("receive_message", `Server sent ${JSON.stringify(data)}`);
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(5000, () => {
  console.log(`Server running on http://localhost:5000/`);
});
