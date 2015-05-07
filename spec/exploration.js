/*
 * This is series of investigations into the optimal syntax and structure,
 * as well as required methods, objects, etc. for the SceneScroller
 * library.
 *
 * Part 1: A red car drives across the scene from left to right at a speed of 10px/sec
 */

var ss = require("scenescroller")

// <div id="scroller"></div>
var scene = new ss.Scene(
  { container  : document.getElementById("scroller")
  , background : new ss.Image('/images/sky.png')
  , framerate  : 30
  , width      : 1000
  , height     : 500
  }
)

var carSprites = new ss.SpriteSheet(
  { src: '/img/cars.png'
  , map: '/img/cars.png.json' // -->
    /*
      { [ { name: 'red',    map: [[ 0,0 ], [ 0,10], [10, 10], [10, 0 ] ] }
        , { name: 'blue',   map: [[10,0 ], [10,10], [20, 10], [20, 0 ] ] }
        , { name: 'orange', map: [[20,0 ], [20,10], [30, 10], [30, 0 ] ] }
        , { name: 'yellow', map: [[ 0,10], [ 0,20], [10, 20], [10, 10] ] }
        , { name: 'silver', map: [[10,10], [10,20], [20, 20], [20, 10] ] }
        , { name: 'black',  map: [[20,10], [20,20], [30, 20], [30, 10] ] }
        ]
      }
    */
  }
)

var Car = ss.Entity.extend(
  { width: 50
  , height: 30
  // Garbage collection, called every n ticks. If it returns true, the object is purged.
  , purge: function() {
      // Purge this object if it is currently not visible AND it either
      //    a) was visible in the past
      // OR b) is older than ~1 minute
      return !this.isVisible() && (this.wasVisible() || this.age() > 30*60)
    }
  }
)

var redCar = new Car(
  { sprite: carSprites.sprite('red')
  , x: -10
  , y: 25
  }
)

// Movement Option 1: Manually translate the element
redCar.on('tick', function() {
  this.translate(this.x + 5, this.y)
})

// Movement Option 2: Set a velocity on the element
redCar.velocity(new ss.Velocity(5,  'px', 'sec'))
redCar.velocity(new ss.Velocity(10, '%',  'tick'))
redCar.velocity(new ss.Velocity(2,  'px', 'min'))


scene.insert(redCar)

/*
 * Analysys of Part 1.
 *
 * ### Questions
 * 1. How should properties be accessed? Some options:
 *
 *  a) Only via methods, where methods are named exactly as the property
 *     The values themselves are either private variables OR public properties
 *     To get the value of `foo` on some object, use `var fooVal = myObject.foo()`.
 *     To set the value of `foo` on some object, use `myObject.foo("bar")`
 *
 *  b) Only via methods, where methods are named exactly as the property prefixed with `get` and `set`
 *     The values themselves are either private variables OR public properties
 *     To get the value of `foo` on some object, use `var fooVal = myObject.getFoo()`.
 *     To set the value of `foo` on some object, use `myObject.setFoo("bar")`
 *
 *  c) Only via properties
 *     To get the value of `foo` on some object, use `var fooVal = myObject.foo`.
 *     To set the value of `foo` on some object, use `myObject.foo = "bar"`
 *
 *  e) Only via a single accessor method, such as `.prop()`
 *     Works like jQuery's `$('#myElem').attr()`
 *     The values themselves are either private variables OR public properties
 *     To get the value of `foo` on some object, use `var fooVal = myObject.prop("foo")`.
 *     To set the value of `foo` on some object, use `myObject.prop("foo", "bar")`
 *
 *  Option A is my favorite after initial consideration.
 *  Using a method to get/set prop allows us to ensure all bindings are kept up-
 *  to-date, easily trigger events on change, etc.
 *
 *  However, I think that the values themselves should probably be kept as public
 *  properties on the object. My reasons for this aren't clear, it's just a gut
 *  feeling. It would be discouraged to access them directly, unless the programmer
 *  fully understands what they're doing.
 *
 * --

 *  2. Should we encapsulate positions, velocities, etc. into their own classes, or keep them
 *     as native `number`s and let the classes they're applied to handle them how they please?
 *
 * I think that we should probably create classes for positions since they will be used so often.
 *
*/

ss.Object =
  { age : Number     // Number of ticks since Object was created
  , on  : Function   // add an event handler
  }

ss.Point =
  { x : Number
  , y : Number
  }

ss.Polygon =
  { points : [ Point ] // Adjacent points are connected
  }

ss.Rectangle =
  { topLeft     : Point
  , topRight    : Point
  , bottomLeft  : Point
  , bottomRight : Point
  , width       : Point
  , height      : Point
  }


