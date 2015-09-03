/* global SceneScroller, mocha, it, describe, assert, expect, beforeEach */

'use strict';

describe('Node', () => {

  var Node = SceneScroller.Node

  // Constructor
  describe('constructor', () => {

    var node

    beforeEach(() => {
      node = new Node()
    })

    it('creates a new Node object', () => {
      expect(node).to.be.instanceof(Node)
    })

    it('inherits from EventEmitter', () => {
      expect(node).to.be.instanceof(SceneScroller.EventEmitter)
    })

  })

})
