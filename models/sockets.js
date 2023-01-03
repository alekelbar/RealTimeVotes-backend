const ElementList = require("./elementList");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }

  setList(list) {
    this.list.setElements(list);
  }

  updateList() {
    this.io.emit("band-list", this.list.getElements());
  }

  socketsEvents() {
    this.list = new ElementList();

    this.io.on("connection", (client) => {
      console.log("Client", client.id, "connected");

      client.on("re-name", ({ name, id }) => {
        this.list.changeName(id, name);
        this.updateList();
      });

      client.on("vote", ({ id }) => {
        this.list.increaseVote(id);
        this.updateList();
      });

      client.on("create", (data) => {
        const { name } = data;
        this.list.addElement(name);
        this.updateList();
      });

      client.on("remove", (data) => {
        const { id } = data;
        this.list.remove(id);
        this.updateList();
      });
      //* separation line
      this.io.emit("band-list", this.list.getElements());
    });

    this.io.on("disconnect", (client) => {
      console.log("client", client.id, "disconnect");
    });
  }
}

module.exports = Sockets;
