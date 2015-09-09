/* global SceneScroller, mocha, it, describe, assert, expect, beforeEach */

'use strict';

describe('Scene', () => {

  var Scene = SceneScroller.Scene

  // Constructor
  describe('constructor', () => {

    var scene

    beforeEach(() => {
      scene = new Scene({ container : 'foo' })
    })

    it('creates a new Scene object', () => {
      expect(scene).to.be.instanceof(Scene)
    })

    it('inherits from Node', () => {
      expect(scene).to.be.instanceof(SceneScroller.Node)
    })

  })

})
