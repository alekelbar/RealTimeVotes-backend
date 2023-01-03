const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    // configurar el socket server
    this.io = socketio(this.server);
  }

  midleWares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
  }

  socketsConfigurations() {
    new Sockets(this.io);
  }

  startServer() {
    // define midleWares
    this.midleWares();
    //define sockets..
    this.socketsConfigurations();
    //server listen
    this.server.listen(this.port, () => {
      // Nota, recordar que quien escucha es el server, no el app
      console.log("running at: ", `https://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
