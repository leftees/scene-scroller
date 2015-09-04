/**
 * @module util
 */
'use strict';

var symbols = require('./symbols')

var util = {}

/**
 * Parse options into objects for self and parent classes
 *
 * @param {Object} opts            The opts object containing key-value pairs
 * @param {Object} defaults        An object containing all desired opts to be parsed as key-value pairs with values containing either the default value for the opt OR the symbols `required` or `optional`
 * @return {Array} [parsed, rest]  An array containing a parsed and completed opts object for the caller class and an unparsed opts object containing the rest of the opts
 */
util.parseOpts = function(opts, defaults) {

  if(opts === undefined) {
    opts = {}
  }

  var parsed = {}
    , rest   = Object.assign({}, opts)

  for(let key in defaults) {

    let def = defaults[key]
      , opt = opts[key]

    if(opt === undefined) {
      if(def === symbols.required) {
        throw new Error('Parameter ' + key + ' is required.')
        continue
      } else if(def === symbols.optional) {
        continue
      } else {
        parsed[key] = def
        continue
      }
    }

    parsed[key] = opt
    delete rest[key]
  }

  return [ parsed, rest ]

}

module.exports = util
