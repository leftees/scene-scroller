'use strict';

class Entity {

  constructor() {
    this.created = new Date()
  }

  foo(bar) {
    console.log("foobar: " + bar)
  }

}

module.exports = Entity
