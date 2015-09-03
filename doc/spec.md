#SceneScroller
##Specification

#Overview
This document contains the API specification for the SceneScroller library.

## x.x.x (stable)

###Overview
There is no stable release at this time.

###Changelog
*n/a*

###Spec
*n/a*

----

## 0.1.0

###Overview
The initial draft of the SceneScroller API specification. Everything described herein is subject to heavy modification.

###Changelog
*n/a*

###Classes

####Node [->EventEmitter]

_description_

Base class from which every other SceneScroller class inherits.
From [EventEmitter](https://github.com/Olical/EventEmitter).

_properties:_

  * __.foo__ [Type] - description

_methods:_

  * __.bar(Type argName1, Type argName2[, Type optionalName])__ [Type returnName] - description

####Element [->Node->EventEmitter]

####Entity [->Element->Node->EventEmitter]

_description_

Foobar

_properties:_

  * __.created__ [Date]   - an instance of Date corrosponding to the time the object was instantiated
  * __.parent__  [Object] - the immediate ancestor of this object, if any. Default: `null`

_methods:_

  * __.destroy()__ - destroys the entity

####Position

####Velocity

####SpriteSheet

####Sprite

---
