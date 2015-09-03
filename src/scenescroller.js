/* global window */
'use strict';

var SceneScroller = {}

// Classes
SceneScroller.EventEmitter = require('./eventemitter')
SceneScroller.Node         = require('./node')
SceneScroller.Entity       = require('./entity')

// Other
SceneScroller.symbols      = require('./symbols')
SceneScroller.util         = require('./util')

module.exports = SceneScroller

if(window) {
  window.SceneScroller = SceneScroller
}
