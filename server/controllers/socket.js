// const getOnlineMembers = (io) => {
//   let clients = io.sockets.adapter.rooms;
//   console.log(io.sockets);
//   console.log("clients:");
//   console.log(clients);
//   let sockets = Object.values(clients);
//   console.log(sockets);
//   let users = sockets.map((socket) => socket.user);
//   return users;
// };

var users = {};

// const emitOnlineMembers = (io) => {
//   io.emit("online");
// };

const connectSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      transports: ["websocket"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connection made " + socket.id);

    io.on("check", () => {
      console.log("worked");
    });

    io.on("logine", (user) => {
      console.log("narukuto");
      users[user.value] = socket.id;
      console.log(users);
      io.emit("online", Object.keys(users).length);
    });

    socket.on("send_message", (data) => {
      console.log(`Sent fromm client to server :${JSON.stringify(data)}`);
      io.emit("receive_message", `Server sent ${JSON.stringify(data)}`);
    });

    // server.emit("ping");

    // io.of("/").adapter.on("create-room", (room) => {
    //   console.log(`room ${room} was created`);
    // });

    // io.of("/").adapter.on("join-room", (room, id) => {
    //   console.log(`socket ${id} has joined room ${room}`);
    // });

    // socket.on("new_user", (user) => {
    //   console.log("new user", user);
    //   socket.user = user.user;
    //   // io.socketsJoin("room1");
    //   emitOnlineMembers(io);
    // });

    // **************************acknoledgement*********************************

    //client side
    // socket.emit("is_friend", "dani", "dani",(response)=>{
    //   (response.status?"Friend":"enemy")
    // });

    //server side
    // socket.on("is_friend", (u1, u2, callback)=>{
    //   if(u1==u2)
    //  { callback({
    //     status:1
    //   })}else{
    //     callback({
    //       status:0
    //     })
    //   }
    // });

    //************************Namespace*********************** */

    //server side
    // const admin = io.of("/admin");
    // admin.on("connection", () => {
    //   console.log("admin logged in!");
    // });

    //client side
    // io.connect("http://localhost:5000/admin")

    socket.on("disconnect", () => {
      // emitOnlineMembers(io);
      console.log("User disconnected!");
    });

    socket.on("ping", (data) => {
      io.emit("pong", data.date);
    });
  });
};

module.exports = connectSocket;
