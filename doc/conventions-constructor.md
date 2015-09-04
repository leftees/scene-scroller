#Conventions: Constructors

##Overview
All SceneScroller classes follow a shared constructor convention,
enabling argument objects to bubble up the class hierarchy. 

All SceneScroller objects are instantiated with an optional "opts"
object containing key-value option pairs. If an "opts" object is not
passed to a constructor, default values will be used wherever applicable.
However, some classes may have required opts, in which case an error
will be thrown if an opts object or a required opt is omitted.

Under the hood, class constructors splice out the options they require
from the opts object, before passing the resulting object containing all
opts they did not utilize to their parent class. This continues all the
way up the class tree.

##Example

    class Parent {
      constructor() {
        var defaults = 
          { x : 0
          , y : 0
          }
        var [ opts, rest ] = parseOpts(arguments[0], defaults)

        this.x = opts.x
        this.y = opts.y
      }
    }

    class Child extends Parent {
      constructor() {
        var defaults = 
          { z : 0
          }
        var [ opts, rest ] = parseOpts(arguments[0], defaults)
        super(rest)

        this.z = opts.z
      }
    }

    var a = new Parent({ x : 5, y : 3 })
    var b = new Child({ x : 10, z : 5 })

    console.dir(a)
    /**
     * Object {
     *   x : 5,
     *   y : 3
     * }
     */

     console.dir(b)
     /**
      * Object {
      *   x : 10,
      *   y : 0,
      *   z : 5
      *  }
      */

##Notes

Keep in mind, non-primative objects are always passed by reference, not
by value.
