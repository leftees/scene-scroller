/*
 * @module Entity
 */
'use strict';

var Node = require('./node')

var util = require('./util')

/**
 * @class Entity
 * @extends Node
 * @see [Node](./node.md)
 * @see [Constructor Conventions](../conventions-constructor.md)
 */
class Entity extends Node {
  constructor() {

    var defaults =
      {
      }

    var [ opts, rest ] = util.parseOpts(arguments[0], defaults)

    super(rest)

    /**
     * @property {Date} created Date corresponding to creation time of the Entity.
     */
    this.created = new Date()

  }

}

module.exports = Entity
