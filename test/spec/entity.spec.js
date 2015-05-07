/* global SceneScroller, mocha, it, describe, assert, expect */

'use strict';

describe('Entity', () => {
  describe('Constructor', () => {
    it('Creates a new Entity object', () => {
      var e = new SceneScroller.Entity()
      assert(e instanceof SceneScroller.Entity)
    })
    it('Sets .created to Date object of creation time', () => {
      var t1 = new Date()
      var e = new SceneScroller.Entity()
      var t2 = new Date()
      expect(e.created).to.be.least(t1).and.most(t2)
    })
  })
})
