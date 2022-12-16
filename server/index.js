const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST", "PUT"],
  },
});
io.on("connection", () => {
  console.log("Connection made");
});

app.get("/", (req, res) => {
  res.send("hello there!");
});

server.listen(5000, () => {
  console.log(`Server running on http://localhost:5000/`);
});
