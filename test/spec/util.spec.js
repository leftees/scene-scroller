/* global SceneScroller, mocha, it, xit, describe, assert, expect, beforeEach */

'use strict';

describe('util', () => {

  var parseOpts = SceneScroller.util.parseOpts

  describe('parseOpts', () => {

    beforeEach(() => {
    })

    it('returns an array containing a result object and an object containing items not specified in the defaults object', () => {
      var opts     = { parent : 'foo', color : 'red' }
        , defaults = { parent : SceneScroller.symbols.required , x : 0, y : 0 }

      var [ parsed, rest ] = parseOpts(opts, defaults)

      expect(parsed).to
        .deep.equal({ parent : 'foo', x : 0, y : 0 })

      expect(rest).to
        .deep.equal({ color : 'red' })
    })

    it('throws an error if a required value is not present in the opts object', () => {
      var opts     = { foo : 'bar' }
        , defaults = { qux : SceneScroller.symbols.required }

      var err = null

      try {
        var [ parsed, rest ] = parseOpts(opts, defaults)
      } catch(e) {
        err = e
      }

      expect(err).to.be.instanceof(Error)
    })

    it('does not include an optional value in the result object if it is not present in the opts object', () => {
      var opts     = { foo : 'bar', nope : true }
        , defaults = { foo : 1, spam : 'herp',  qux : SceneScroller.symbols.optional }

      var [ parsed, rest ] = parseOpts(opts, defaults)

      expect(parsed).to
        .deep.equal({ foo : 'bar', spam : 'herp' })

      expect(rest).to
        .deep.equal({ nope : true })
    })
  })
})
