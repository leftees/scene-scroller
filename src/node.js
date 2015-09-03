'use strict';

var EventEmitter  = require('./eventemitter')

var util    = require('./util')
  , symbols = require('./symbols')

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
