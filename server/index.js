const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});
io.on("connection", (socket) => {
  console.log("Connection made");
  socket.on("sample", (data) => {
    console.log(`Fromm server :${JSON.stringify(data)}`);
    io.emit("sample1", "This is server");
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(5000, () => {
  console.log(`Server running on http://localhost:5000/`);
});
