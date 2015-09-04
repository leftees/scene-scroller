<a name="module_EventEmitter"></a>
## EventEmitter
SceneScroller.EventEmitter
(c) 2015 Derrick Cohodas
MIT License

Based on Oliver Caldwell's EventEmitter @ v4.2.11 (git.io/ee)
(Original License: Unlicense - http://unlicense.org/)


* [EventEmitter](#module_EventEmitter)
  * [~EventEmitter](#module_EventEmitter..EventEmitter)
    * [.getListeners(evt)](#module_EventEmitter..EventEmitter+getListeners) ⇒ <code>Array.&lt;function()&gt;</code> &#124; <code>Object</code>
    * [.flattenListeners(listeners)](#module_EventEmitter..EventEmitter+flattenListeners) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.getListenersAsObject(evt)](#module_EventEmitter..EventEmitter+getListenersAsObject) ⇒ <code>Object</code>
    * [.addListener(evt, listener)](#module_EventEmitter..EventEmitter+addListener) ⇒ <code>Object</code>
    * [.on()](#module_EventEmitter..EventEmitter+on)
    * [.addOnceListener(evt, listener)](#module_EventEmitter..EventEmitter+addOnceListener) ⇒ <code>Object</code>
    * [.once()](#module_EventEmitter..EventEmitter+once)
    * [.defineEvent(evt)](#module_EventEmitter..EventEmitter+defineEvent) ⇒ <code>Object</code>
    * [.defineEvents(evts)](#module_EventEmitter..EventEmitter+defineEvents) ⇒ <code>Object</code>
    * [.removeListener(evt, listener)](#module_EventEmitter..EventEmitter+removeListener) ⇒ <code>Object</code>
    * [.off()](#module_EventEmitter..EventEmitter+off)
    * [.addListeners(evt, [listeners])](#module_EventEmitter..EventEmitter+addListeners) ⇒ <code>Object</code>
    * [.removeListeners(evt, [listeners])](#module_EventEmitter..EventEmitter+removeListeners) ⇒ <code>Object</code>
    * [.manipulateListeners(remove, evt, [listeners])](#module_EventEmitter..EventEmitter+manipulateListeners) ⇒ <code>Object</code>
    * [.removeEvent([evt])](#module_EventEmitter..EventEmitter+removeEvent) ⇒ <code>Object</code>
    * [.removeAllListeners()](#module_EventEmitter..EventEmitter+removeAllListeners)
    * [.emitEvent(evt, [args])](#module_EventEmitter..EventEmitter+emitEvent) ⇒ <code>Object</code>
    * [.trigger()](#module_EventEmitter..EventEmitter+trigger)
    * [.emit(evt, ...Optional)](#module_EventEmitter..EventEmitter+emit) ⇒ <code>Object</code>
    * [.setOnceReturnValue(value)](#module_EventEmitter..EventEmitter+setOnceReturnValue) ⇒ <code>Object</code>
    * [._getOnceReturnValue()](#module_EventEmitter..EventEmitter+_getOnceReturnValue) ⇒ <code>\*</code> &#124; <code>Boolean</code>
    * [._getEvents()](#module_EventEmitter..EventEmitter+_getEvents) ⇒ <code>Object</code>
  * [~indexOfListener(listeners, listener)](#module_EventEmitter..indexOfListener) ⇒ <code>Number</code>

<a name="module_EventEmitter..EventEmitter"></a>
### EventEmitter~EventEmitter
EventEmitter Manages event registering and emitting.

**Kind**: inner class of <code>[EventEmitter](#module_EventEmitter)</code>  

* [~EventEmitter](#module_EventEmitter..EventEmitter)
  * [.getListeners(evt)](#module_EventEmitter..EventEmitter+getListeners) ⇒ <code>Array.&lt;function()&gt;</code> &#124; <code>Object</code>
  * [.flattenListeners(listeners)](#module_EventEmitter..EventEmitter+flattenListeners) ⇒ <code>Array.&lt;function()&gt;</code>
  * [.getListenersAsObject(evt)](#module_EventEmitter..EventEmitter+getListenersAsObject) ⇒ <code>Object</code>
  * [.addListener(evt, listener)](#module_EventEmitter..EventEmitter+addListener) ⇒ <code>Object</code>
  * [.on()](#module_EventEmitter..EventEmitter+on)
  * [.addOnceListener(evt, listener)](#module_EventEmitter..EventEmitter+addOnceListener) ⇒ <code>Object</code>
  * [.once()](#module_EventEmitter..EventEmitter+once)
  * [.defineEvent(evt)](#module_EventEmitter..EventEmitter+defineEvent) ⇒ <code>Object</code>
  * [.defineEvents(evts)](#module_EventEmitter..EventEmitter+defineEvents) ⇒ <code>Object</code>
  * [.removeListener(evt, listener)](#module_EventEmitter..EventEmitter+removeListener) ⇒ <code>Object</code>
  * [.off()](#module_EventEmitter..EventEmitter+off)
  * [.addListeners(evt, [listeners])](#module_EventEmitter..EventEmitter+addListeners) ⇒ <code>Object</code>
  * [.removeListeners(evt, [listeners])](#module_EventEmitter..EventEmitter+removeListeners) ⇒ <code>Object</code>
  * [.manipulateListeners(remove, evt, [listeners])](#module_EventEmitter..EventEmitter+manipulateListeners) ⇒ <code>Object</code>
  * [.removeEvent([evt])](#module_EventEmitter..EventEmitter+removeEvent) ⇒ <code>Object</code>
  * [.removeAllListeners()](#module_EventEmitter..EventEmitter+removeAllListeners)
  * [.emitEvent(evt, [args])](#module_EventEmitter..EventEmitter+emitEvent) ⇒ <code>Object</code>
  * [.trigger()](#module_EventEmitter..EventEmitter+trigger)
  * [.emit(evt, ...Optional)](#module_EventEmitter..EventEmitter+emit) ⇒ <code>Object</code>
  * [.setOnceReturnValue(value)](#module_EventEmitter..EventEmitter+setOnceReturnValue) ⇒ <code>Object</code>
  * [._getOnceReturnValue()](#module_EventEmitter..EventEmitter+_getOnceReturnValue) ⇒ <code>\*</code> &#124; <code>Boolean</code>
  * [._getEvents()](#module_EventEmitter..EventEmitter+_getEvents) ⇒ <code>Object</code>

<a name="module_EventEmitter..EventEmitter+getListeners"></a>
#### eventEmitter.getListeners(evt) ⇒ <code>Array.&lt;function()&gt;</code> &#124; <code>Object</code>
Returns the listener array for the specified event.
Will initialise the event object and listener arrays if required.
Will return an object if you use a regex search. The object contains keys for each matched event.
Each property in the object response is an array of listener functions.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Array.&lt;function()&gt;</code> &#124; <code>Object</code> - All listener functions for the event.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to return the listeners from. |

<a name="module_EventEmitter..EventEmitter+flattenListeners"></a>
#### eventEmitter.flattenListeners(listeners) ⇒ <code>Array.&lt;function()&gt;</code>
Takes a list of listener objects and flattens it into a list of listener functions.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Array.&lt;function()&gt;</code> - Just the listener functions.  

| Param | Type | Description |
| --- | --- | --- |
| listeners | <code>Array.&lt;Object&gt;</code> | Raw listener objects. |

<a name="module_EventEmitter..EventEmitter+getListenersAsObject"></a>
#### eventEmitter.getListenersAsObject(evt) ⇒ <code>Object</code>
Fetches the requested listeners via getListeners but will always return the results inside an object.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - All listener functions for an event in an object.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to return the listeners from. |

<a name="module_EventEmitter..EventEmitter+addListener"></a>
#### eventEmitter.addListener(evt, listener) ⇒ <code>Object</code>
Adds a listener function to the specified event.
The listener will not be added if it is a duplicate.
If the listener returns true then it will be removed after it is called.
If you pass a regular expression as the event name then the listener will be added to all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to attach the listener to. |
| listener | <code>function</code> | Method to be called when the event is emitted. If the function returns true then it will be removed after calling. |

<a name="module_EventEmitter..EventEmitter+on"></a>
#### eventEmitter.on()
Alias of addListener

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
<a name="module_EventEmitter..EventEmitter+addOnceListener"></a>
#### eventEmitter.addOnceListener(evt, listener) ⇒ <code>Object</code>
Semi-alias of addListener. It will add a listener that will be
automatically removed after its first execution.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to attach the listener to. |
| listener | <code>function</code> | Method to be called when the event is emitted. If the function returns true then it will be removed after calling. |

<a name="module_EventEmitter..EventEmitter+once"></a>
#### eventEmitter.once()
Alias of addOnceListener

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
<a name="module_EventEmitter..EventEmitter+defineEvent"></a>
#### eventEmitter.defineEvent(evt) ⇒ <code>Object</code>
Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once.
You need to tell it what event names should be matched by a regex.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> | Name of the event to create. |

<a name="module_EventEmitter..EventEmitter+defineEvents"></a>
#### eventEmitter.defineEvents(evts) ⇒ <code>Object</code>
Uses defineEvent to define multiple events.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evts | <code>Array.&lt;String&gt;</code> | An array of event names to define. |

<a name="module_EventEmitter..EventEmitter+removeListener"></a>
#### eventEmitter.removeListener(evt, listener) ⇒ <code>Object</code>
Removes a listener function from the specified event.
When passed a regular expression as the event name, it will remove the listener from all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to remove the listener from. |
| listener | <code>function</code> | Method to remove from the event. |

<a name="module_EventEmitter..EventEmitter+off"></a>
#### eventEmitter.off()
Alias of removeListener

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
<a name="module_EventEmitter..EventEmitter+addListeners"></a>
#### eventEmitter.addListeners(evt, [listeners]) ⇒ <code>Object</code>
Adds listeners in bulk using the manipulateListeners method.
If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays; You can also pass it an event name and an array of listeners to be added.
You can also pass it a regular expression to add the array of listeners to all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>Object</code> &#124; <code>RegExp</code> | An event name if you will pass an array of listeners next. An object if you wish to add multiple events at once. |
| [listeners] | <code>Array.&lt;function()&gt;</code> | An optional array of listener functions to add. |

<a name="module_EventEmitter..EventEmitter+removeListeners"></a>
#### eventEmitter.removeListeners(evt, [listeners]) ⇒ <code>Object</code>
Removes listeners in bulk using the manipulateListeners method.
If you pass an object as the second argument you can remove multiple events at once. The object should contain key value pairs of events and listeners or listener arrays; You can also pass it an event name and an array of listeners to be added.
You can also pass it an event name and an array of listeners to be removed.
You can also pass it a regular expression to remove the listeners from all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>Object</code> &#124; <code>RegExp</code> | An event name if you will pass an array of listeners next. An object if you wash to remove multiple events at once. |
| [listeners] | <code>Array.&lt;function()&gt;</code> | An optional array of listener functions to remove. |

<a name="module_EventEmitter..EventEmitter+manipulateListeners"></a>
#### eventEmitter.manipulateListeners(remove, evt, [listeners]) ⇒ <code>Object</code>
Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little bit lower level.
The first argument will determine if the listeners are removed (true) or added (false).
If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
You can also pass it an event name and an array of listeners to be added/removed.
You can also pass it a regular expression to manipulate the listeners of all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| remove | <code>Boolean</code> | True if you want to remove listeners, false if you want to add. |
| evt | <code>String</code> &#124; <code>Object</code> &#124; <code>RegExp</code> | An event name if you will pass an array of listeners next. An object if you wash to remove multiple events at once. |
| [listeners] | <code>Array.&lt;function()&gt;</code> | An optional array of listener functions to add/remove. |

<a name="module_EventEmitter..EventEmitter+removeEvent"></a>
#### eventEmitter.removeEvent([evt]) ⇒ <code>Object</code>
Removes all listeners from a specified event.
If you do not specify an event then all listeners will be removed.
That means every event will be emptied.
You can also pass a regex to remove all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| [evt] | <code>String</code> &#124; <code>RegExp</code> | Optional name of the event to remove all listeners for. Will remove from every event if not passed. |

<a name="module_EventEmitter..EventEmitter+removeAllListeners"></a>
#### eventEmitter.removeAllListeners()
Alias of removeEvent.

Added to mirror the node API.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
<a name="module_EventEmitter..EventEmitter+emitEvent"></a>
#### eventEmitter.emitEvent(evt, [args]) ⇒ <code>Object</code>
Emits an event of your choice.
When emitted, every listener attached to that event will be executed.
If you pass the optional argument array then those arguments will be passed to every listener upon execution.
Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
So they will not arrive within the array on the other side, they will be separate.
You can also pass a regular expression to emit to all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to emit and execute listeners for. |
| [args] | <code>Array</code> | Optional array of arguments to be passed to each listener. |

<a name="module_EventEmitter..EventEmitter+trigger"></a>
#### eventEmitter.trigger()
Alias of emitEvent

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
<a name="module_EventEmitter..EventEmitter+emit"></a>
#### eventEmitter.emit(evt, ...Optional) ⇒ <code>Object</code>
Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> &#124; <code>RegExp</code> | Name of the event to emit and execute listeners for. |
| ...Optional | <code>\*</code> | Additional arguments to be passed to each listener. |

<a name="module_EventEmitter..EventEmitter+setOnceReturnValue"></a>
#### eventEmitter.setOnceReturnValue(value) ⇒ <code>Object</code>
Sets the current value to check against when executing listeners. If a
listeners return value matches the one set here then it will be removed
after execution. This value defaults to true.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - Current instance of EventEmitter for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The new value to check for when executing listeners. |

<a name="module_EventEmitter..EventEmitter+_getOnceReturnValue"></a>
#### eventEmitter._getOnceReturnValue() ⇒ <code>\*</code> &#124; <code>Boolean</code>
Fetches the current value to check against when executing listeners. If
the listeners return value matches this one then it should be removed
automatically. It will return true by default.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>\*</code> &#124; <code>Boolean</code> - The current value to check for or the default, true.  
**Api**: private  
<a name="module_EventEmitter..EventEmitter+_getEvents"></a>
#### eventEmitter._getEvents() ⇒ <code>Object</code>
Fetches the events object and creates one if required.

**Kind**: instance method of <code>[EventEmitter](#module_EventEmitter..EventEmitter)</code>  
**Returns**: <code>Object</code> - The events storage object.  
**Api**: private  
<a name="module_EventEmitter..indexOfListener"></a>
### EventEmitter~indexOfListener(listeners, listener) ⇒ <code>Number</code>
Finds the index of the listener for the event in its storage array.

**Kind**: inner method of <code>[EventEmitter](#module_EventEmitter)</code>  
**Returns**: <code>Number</code> - Index of the specified listener, -1 if not found  
**Api**: private  

| Param | Type | Description |
| --- | --- | --- |
| listeners | <code>Array.&lt;function()&gt;</code> | Array of listeners to search through. |
| listener | <code>function</code> | Method to look for. |

