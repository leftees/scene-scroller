'use strict';

var EventEmitter = require('./eventemitter')

class Entity extends EventEmitter {

  constructor(...args) {
    super(...args)
    this.created = new Date()
  }

}

module.exports = Entity
