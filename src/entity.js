'use strict';

var Node = require('./node')

var util = require('./util.js')

class Entity extends Node {

  constructor(...rest) {

    super(...rest)

    this.created = new Date()

  }

}

module.exports = Entity
