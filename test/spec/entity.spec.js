/* global SceneScroller, mocha, it, describe, assert, expect, beforeEach */

'use strict';

describe('Entity', () => {

  var Entity = SceneScroller.Entity

  // Constructor
  describe('constructor', () => {

    var entity

    beforeEach(() => {
      entity = new Entity()
    })

    it('creates a new Entity object', () => {
      assert(entity instanceof Entity)
    })

    it('inherits from EventEmitter', () => {
      assert(entity instanceof SceneScroller.EventEmitter)
    })

    it('sets its created property to the time the object was instantiated', () => {
      var t1 = new Date()
      var e  = new SceneScroller.Entity()
      var t2 = new Date()
      expect(e.created).to.be.least(t1).and.most(t2)
      assert(e.created instanceof Date)
    })

  })

})
