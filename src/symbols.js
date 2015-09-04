/**
 * @module symbols
 */
'use strict';

var s = Symbol

/**
 * @namespace symbols
 */
var symbols = {}

/**
 * @property {Symbol} required Signifies a required option, argument, etc.
 * @constant
 */
symbols.required = s('required')

/**
 * @property {Symbol} options Signifies an optional option, argument, etc.
 * @constant
 */
symbols.optional = s('optional')

module.exports = symbols
