const { v4: uuid } = require("uuid");

class Element {
  constructor(name) {
    this.name = name;
    this.id = uuid();
    this.votes = 0;
  }
}

module.exports = Element;
