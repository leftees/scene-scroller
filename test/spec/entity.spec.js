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
      expect(entity).to.be.instanceof(Entity)
    })

    it('inherits from Node', () => {
      expect(entity).to.be.instanceof(SceneScroller.Node)
    })

    it('sets its created property to the time the object was instantiated', () => {
      var t1 = new Date()
      var e  = new SceneScroller.Entity()
      var t2 = new Date()
      expect(e.created).to.be.instanceof(Date)
      expect(e.created).to.be.least(t1).and.most(t2)
    })

  })

})
