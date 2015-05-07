/* global window */
'use strict';

var SceneScroller =
  { Entity : require("./entity")
  }

module.exports = SceneScroller

if(window) {
  window.SceneScroller = SceneScroller
}
