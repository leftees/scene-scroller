/*
 * @module Entity
 */
'use strict';

var Node = require('./node')

var util = require('./util.js')

/**
 * @class Entity
 * @extends Node
 * @param {Object} opts Relevant opts: _none_. Rest passed to `Node`.
 */
class Entity extends Node {
  constructor() {
    super()

    /**
     * @param {Date} created Date corresponding to creation time of the Entity.
     */
    this.created = new Date()

  }

}

module.exports = Entity
