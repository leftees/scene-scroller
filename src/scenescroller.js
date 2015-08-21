/* global window */
'use strict';

var SceneScroller =
  { EventEmitter : require('./eventemitter')
  , Entity       : require('./entity')
  }

module.exports = SceneScroller

if(window) {
  window.SceneScroller = SceneScroller
}
