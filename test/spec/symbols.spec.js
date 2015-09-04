/* global SceneScroller, mocha, it, xit, describe, assert, expect, beforeEach */

'use strict';

describe('symbols', () => {

  var symbols = SceneScroller.symbols

  var isSymbol = function(s) {
    return typeof s === 'symbol' || typeof s === 'object'
  }

  it('required', () => {
    assert(isSymbol(symbols.required))
  })

  it('optional', () => {
    assert(isSymbol(symbols.optional))
  })

})
