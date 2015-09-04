/*
 * @module Node
 */
'use strict';

var EventEmitter  = require('./eventemitter')

var util    = require('./util')
  , symbols = require('./symbols')

/**
 * @class Node
 * @extends EventEmitter
 * @see [EventEmitter](./eventemitter.md)
 * @see [Constructor Conventions](../conventions-constructor.md)
 * @param {Node} [parent=null] The parent of this Node. Can be an instance of Node or any of its descendant classes.
 */
class Node extends EventEmitter {

  constructor() {

    var defaults =
      { parent : null
      }

    var [ opts, rest ] = util.parseOpts(arguments[0], defaults)

    super(rest)

    this.parent = ( opts.parent instanceof Node ) ? opts.parent : null

  }

}

module.exports = Node
