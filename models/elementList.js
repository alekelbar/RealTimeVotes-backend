const Element = require("./element");

class ElementList {
  constructor(elementList = []) {
    this.elementList = elementList; // Array of elements
  }

  addElement(name) {
    const element = new Element(name);
    this.elementList.push(element);
  }

  remove(id) {
    this.elementList = this.elementList.filter((e) => e.id !== id);
  }

  getElements() {
    return this.elementList;
  }

  setElements(newList) {
    this.elementList = this.elementList = newList;
  }

  increaseVote(id) {
    this.elementList = this.elementList.map((e) => {
      if (e.id === id) {
        e.votes++;
      }
      return e;
    });
  }

  changeName(id, newName) {
    this.elementList = this.elementList.map((e) => {
      if (e.id === id) {
        e.name = newName;
      }
      return e;
    });
  }
}

module.exports = ElementList;
