/* global window */

/**
 * @module SceneScroller
 */
'use strict';

/**
 * @namespace SceneScroller
 */
var SceneScroller = {}


/**
 * @property {String} version The version of this SceneScroller distribution.
 */
SceneScroller.version = require('../package.json').version

/**
 * @property {Class} EventEmitter
 * @see [EventEmitter](./eventemitter.md)
 */
SceneScroller.EventEmitter = require('./eventemitter')

/**
 * @property {Class} Node
 * @see [Node](./node.md)
 */
SceneScroller.Node = require('./node')

/**
 * @property {Class} Entity
 * @see [Entity](./entity.md)
 */
SceneScroller.Entity = require('./entity')

/**
 * @property {Object} symbols
 * @see [symbols](./symbols.md)
 */
SceneScroller.symbols = require('./symbols')

/**
 * @property {Object} util
 * @see [util](./util.md)
 */
SceneScroller.util = require('./util')

module.exports = SceneScroller

if(window) {
  window.SceneScroller = SceneScroller
}
