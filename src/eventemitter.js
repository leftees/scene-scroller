/**
 * @module EventEmitter
 * @copyright 2015 Derrick Cohodas
 * @license MIT
 * @see [EventEmitter by Oliver Caldwell](git.ee/ee)
 */

'use strict';

/**
 * Finds the index of the listener for the event in its storage array.
 *
 * @param  {Function[]} listeners Array of listeners to search through.
 * @param  {Function}   listener  Method to look for.
 * @return {Number}               Index of the specified listener, -1 if not found
 * @api    private
 */
function indexOfListener(listeners, listener) {
  var i = listeners.length
  while(i--) {
    if(listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

/**
 * Class for managing events.
 * Can be extended to provide event functionality in other classes.
 *
 * @class EventEmitter Manages event registering and emitting.
 */
class EventEmitter {

  /**
   * Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Will return an object if you use a regex search. The object contains keys for each matched event.
   * Each property in the object response is an array of listener functions.
   *
   * @param  {String|RegExp}     evt Name of the event to return the listeners from.
   * @return {Function[]|Object}     All listener functions for the event.
   */
  getListeners(evt) {
    var events = this._getEvents()

    var response
      , key

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (evt instanceof RegExp) {
      response = {}
      for(key in events) {
        if(events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key]
        }
      }
    } else {
      response = events[evt] || (events[evt] = [])
    }

    return response
  }

  /**
   * Takes a list of listener objects and flattens it into a list of listener functions.
   *
   * @param  {Object[]}   listeners Raw listener objects.
   * @return {Function[]}           Just the listener functions.
   */
  flattenListeners(listeners) {
    var flatListeners = []

    for(var i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener)
    }

    return flatListeners
  }

  /**
   * Fetches the requested listeners via getListeners but will always return the results inside an object.
   *
   * @param  {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Object}            All listener functions for an event in an object.
   */
  getListenersAsObject(evt) {
    var listeners = this.getListeners(evt)
    var response

    if(listeners instanceof Array) {
      response = {}
      response[evt] = listeners
    }

    return response || listeners
  }

  /**
   * Adds a listener function to the specified event.
   * The listener will not be added if it is a duplicate.
   * If the listener returns true then it will be removed after it is called.
   * If you pass a regular expression as the event name then the listener will be added to all events that match it.
   *
   * @param  {String|RegExp} evt      Name of the event to attach the listener to.
   * @param  {Function}      listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object}                 Current instance of EventEmitter for chaining.
   */
  addListener(evt, listener) {
    var listeners         = this.getListenersAsObject(evt)
      , listenerIsWrapped = typeof listener === 'object'

    var key

    for(key in listeners) {
      if(listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener :
          { listener : listener
          , once     : false
          }
        )
      }
    }

    return this
  }

  /**
   * Alias of addListener
   */
  on() {
    return this.addListener.apply(this, arguments)
  }

  /**
   * Semi-alias of addListener. It will add a listener that will be
   * automatically removed after its first execution.
   *
   * @param  {String|RegExp} evt      Name of the event to attach the listener to.
   * @param  {Function}      listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object}                 Current instance of EventEmitter for chaining.
   */
  addOnceListener(evt, listener) {
    return this.addListener(evt,
      { listener : listener
      , once     : true
      }
    )
  }

  /**
   * Alias of addOnceListener
   */
  once() {
    return this.addOnceListener.apply(this, arguments)
  }

  /**
   * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once.
   * You need to tell it what event names should be matched by a regex.
   *
   * @param  {String} evt Name of the event to create.
   * @return {Object}     Current instance of EventEmitter for chaining.
   */
  defineEvent(evt) {
    this.getListeners(evt)
    return this
  }

  /**
   * Uses defineEvent to define multiple events.
   *
   * @param  {String[]} evts An array of event names to define.
   * @return {Object}        Current instance of EventEmitter for chaining.
   */
  defineEvents(evts) {
    for(var i = 0; i < evts.length; i++) {
      this.defineEvent(evts[i])
    }
    return this
  }

  /**
   * Removes a listener function from the specified event.
   * When passed a regular expression as the event name, it will remove the listener from all events that match it.
   *
   * @param  {String|RegExp} evt      Name of the event to remove the listener from.
   * @param  {Function}      listener Method to remove from the event.
   * @return {Object}                 Current instance of EventEmitter for chaining.
   */
  removeListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt)

    var index
      , key

    for(key in listeners) {
      if(listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener)

        if(index !== -1) {
          listeners[key].splice(index, 1)
        }
      }
    }

    return this
  }

  /**
   * Alias of removeListener
   */
  off() {
    return this.removeListener.apply(this, arguments)
  }

  /**
   * Adds listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays; You can also pass it an event name and an array of listeners to be added.
   * You can also pass it a regular expression to add the array of listeners to all events that match it.
   *
   * @param  {String|Object|RegExp} evt         An event name if you will pass an array of listeners next. An object if you wish to add multiple events at once.
   * @param  {Function[]}           [listeners] An optional array of listener functions to add.
   * @return {Object}                           Current instance of EventEmitter for chaining.
   */
  addListeners(evt, listeners) {
    return this.manipulateListeners(false, evt, listeners)
  }

  /**
   * Removes listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can remove multiple events at once. The object should contain key value pairs of events and listeners or listener arrays; You can also pass it an event name and an array of listeners to be added.
   * You can also pass it an event name and an array of listeners to be removed.
   * You can also pass it a regular expression to remove the listeners from all events that match it.
   *
   * @param  {String|Object|RegExp} evt         An event name if you will pass an array of listeners next. An object if you wash to remove multiple events at once.
   * @param  {Function[]}           [listeners] An optional array of listener functions to remove.
   * @return {Object}                           Current instance of EventEmitter for chaining.
   */
  removeListeners(evt, listeners) {
    return this.manipulateListeners(true, evt, listeners)
  }

  /**
   * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little bit lower level.
   * The first argument will determine if the listeners are removed (true) or added (false).
   * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added/removed.
   * You can also pass it a regular expression to manipulate the listeners of all events that match it.
   *
   * @param  {Boolean}              remove      True if you want to remove listeners, false if you want to add.
   * @param  {String|Object|RegExp} evt         An event name if you will pass an array of listeners next. An object if you wash to remove multiple events at once.

   * @param  {Function[]}           [listeners] An optional array of listener functions to add/remove.
   * @return {Object}                           Current instance of EventEmitter for chaining.
   */
  manipulateListeners(remove, evt, listeners) {
    var value
      , i

    var single    = remove ? this.removeListener  : this.addListener
      , multiple  = remove ? this.removeListeners : this.addListeners

    if(typeof evt === 'object' && !(evt instanceof RegExp)) {
      for(i in evt) {
        if(evt.hasOwnProperty(i)) {
          value = evt[i]
          if(typeof value === 'function') {
            single.call(this, i, value)
          } else {
            multiple.call(this, i, value)
          }
        }
      }
    } else {
      i = listeners.length
      while(i--) {
        single.call(this, evt, listeners[i])
      }
    }

    return this
  }

  /**
   * Removes all listeners from a specified event.
   * If you do not specify an event then all listeners will be removed.
   * That means every event will be emptied.
   * You can also pass a regex to remove all events that match it.
   *
   * @param  {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
   * @return {Object}              Current instance of EventEmitter for chaining.
   */
  removeEvent(evt) {
    var events = this._getEvents()

    if(typeof evt === 'string') {
      delete events[evt]
    } else if(evt instanceof RegExp) {
      for(var key in events) {
        if(events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key]
        }
      }
    } else {
      delete this._events
    }

    return this
  }

  /**
   * Alias of removeEvent.
   *
   * Added to mirror the node API.
   */
  removeAllListeners() {
    return this.removeEvent.apply(this, arguments)
  }

  /**
   * Emits an event of your choice.
   * When emitted, every listener attached to that event will be executed.
   * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
   * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
   * So they will not arrive within the array on the other side, they will be separate.
   * You can also pass a regular expression to emit to all events that match it.
   *
   * @param  {String|RegExp} evt    Name of the event to emit and execute listeners for.
   * @param  {Array}         [args] Optional array of arguments to be passed to each listener.
   * @return {Object}               Current instance of EventEmitter for chaining.
   */
  emitEvent(evt, args) {
    var listeners = this.getListenersAsObject(evt)

    for(var key in listeners) {
      if(listeners.hasOwnProperty(key)) {
        var i = listeners[key].length

        while(i--) {
          var listener = listeners[key][i]

          if(listener.once === true) {
            this.removeListener(evt, listener.listener)
          }

          var response = listener.listener.apply(this, args || [])

          if(response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener)
          }
        }
      }
    }

    return this
  }

  /**
   * Alias of emitEvent
   */
  trigger() {
    return this.emitEvent.apply(this, arguments)
  }

  /**
   * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
   * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
   *
   * @param  {String|RegExp} evt      Name of the event to emit and execute listeners for.
   * @param  {...*}          Optional Additional arguments to be passed to each listener.
   * @return {Object}                 Current instance of EventEmitter for chaining.
   */
  emit(evt) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.emitEvent(evt, args)
  }

  /**
   * Sets the current value to check against when executing listeners. If a
   * listeners return value matches the one set here then it will be removed
   * after execution. This value defaults to true.
   *
   * @param  {*}      value The new value to check for when executing listeners.
   * @return {Object}       Current instance of EventEmitter for chaining.
   */
  setOnceReturnValue(value) {
    this._onceReturnValue = value
    return this
  }

  /**
   * Fetches the current value to check against when executing listeners. If
   * the listeners return value matches this one then it should be removed
   * automatically. It will return true by default.
   *
   * @return {*|Boolean} The current value to check for or the default, true.
   * @api    private
   */
  _getOnceReturnValue() {
    if(this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue
    }
    return true
  }

  /**
   * Fetches the events object and creates one if required.
   *
   * @return {Object} The events storage object.
   * @api    private
   */
  _getEvents() {
    return this._events || (this._events = {})
  }

}

module.exports = EventEmitter
