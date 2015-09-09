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
 */
symbols.required = s('required')

/**
 * @property {Symbol} options Signifies an optional option, argument, etc.
 */
symbols.optional = s('optional')

module.exports = symbols
