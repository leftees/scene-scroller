/*
 * @module Scene
 */
'use strict';

var Node = require('./node')

var util    = require('./util')
  , symbols = require('./symbols')

/**
 * @class Scene
 * @description A scene is the object which attaches to the DOM and can contain any other
 *              node type.
 * @extends Node
 * @see [Node](./node.md)
 * @see [Constructor Conventions](../conventions-constructor.md)
 * @param {String} container      DOM selector
 * @param {Number} [framerate=30] Max number of frames per second.
 * @param {Number} [width=0]      Width of the scene, in pixels. Defaults to the width of the container or 0.
 * @param {Number} [height=0]     Height of the scene, in pixels. Defaults to the height of the container or 0.
 */
class Scene extends Node {
  constructor() {

    var defaults =
      { container : symbols.required
      , framerate : 30
      , width     : 0
      , height    : 0
      }

    var [ opts, rest ] = util.parseOpts(arguments[0], defaults)

    super(rest)

    this.tick()
  }

  tick() {
  }

}

module.exports = Scene
