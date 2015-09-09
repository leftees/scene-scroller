/* global SceneScroller, mocha, describe, it, beforeEach, expect */
'use strict';

describe('Node', () => {

  var Node = SceneScroller.Node

  // Constructor
  describe('constructor', () => {

    var node

    beforeEach(() => {
      node = new Node()
    })

    it('creates a new Node object', () => {
      expect(node).to.be.instanceof(Node)
    })

    it('inherits from EventEmitter', () => {
      expect(node).to.be.instanceof(SceneScroller.EventEmitter)
    })

    it('sets the parent to the node specified in the opts object', () => {
      var parent = new Node()
      node = new Node({ parent })
      expect(node.parent).to.equal(parent)
    })

    it('sets the children to the node(s) specified in the opts object', () => {
      var child1 = new Node()
        , child2 = new Node()

      node = new Node({ children : [ child1, child2 ] })

      expect(node.children).to.contain(child1)
      expect(node.children).to.contain(child2)
    })
  })

  describe('detectCycle', () => {

    beforeEach(() => {
    })

    it('detects a branched cycle', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()
        , d = new Node()

      a.addChildren([b,c])
      c.addChild(d)

      /*
       *    a
       *   /  \
       * [b]   c
       *       |
       *      [d]
       */

      var cycleExists = d.detectCycle(b)

      expect(cycleExists).to.equal(true)
    })

    it('detects an upstream cycle', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()
        , d = new Node()

      a.addChild(b)
      b.addChild(c)
      c.addChild(d)

      /*
       *    a
       *    |
       *   [b]
       *    |
       *    c
       *    |
       *   [d]
       */

      var cycleExists = d.detectCycle(b)

      expect(cycleExists).to.equal(true)
    })

    it('detects an identity cycle', () => {
      var a = new Node()

      var cycleExists = a.detectCycle(a)

      expect(cycleExists).to.equal(true)
    })

    it('returns false if no cycle is possible', () => {
      var a = new Node()
        , b = new Node()

      var c = new Node()
        , d = new Node()

      a.addChild(b)
      c.addChild(d)

      /*
       *   [a]
       *    |
       *    b
       *
       *    c
       *    |
       *   [d]
       */

      var cycleExists = d.detectCycle(a)

      expect(cycleExists).to.equal(false)
    })

  })

  describe('findRoot', () => {
    it('finds the root of a tree with only one node', () => {
      var a    = new Node()
        , root = a.findRoot()

      expect(root).to.equal(a)
    })

    it('finds the root of a tree with multiple nodes, starting from the bottom', () => {
      var a = new Node()
        , b = new Node({ parent : a })
        , c = new Node({ parent : b })
        , d = new Node({ parent : c })

      var root = d.findRoot()

      expect(root).to.equal(a)
    })
  })

  describe('setParent', () => {

    var node
      , parent

    beforeEach(() => {
      node   = new Node()
      parent = new Node()
    })

    it('sets .parent', () => {
      node.setParent(parent)
      expect(node.parent).to.equal(parent)
    })

    it('calls .addChild() on the new parent', () => {
      node.setParent(parent)
      expect(parent.children.indexOf(node)).to.not.equal(-1)
    })

    it('throws an error if parent is not an instanceof Node', () => {
      var err = null
      try {
        node.setParent('foo')
      } catch(e) {
        err = e
      }
      expect(err).to.be.instanceof(Error)
    })

    it('is chainable', () => {
      var r = node.setParent(parent)
      expect(r).to.equal(node)
    })

    it('works with descendants of Node', () => {
      var entityParent = new SceneScroller.Entity()
      node.setParent(entityParent)
      expect(node.parent).to.equal(entityParent)
      expect(entityParent.children.indexOf(node)).to.not.equal(-1)
    })

    it('replaces an existing parent when applicable', () => {
      var parent2 = new Node()

      node.setParent(parent)
        .setParent(parent2)

      expect(node.parent).to.equal(parent2)
    })

    it('calls .removeChild() on the old parent when applicable', () => {
      var parent2 = new Node()

      node.setParent(parent)
        .setParent(parent2)

      expect(parent.children.indexOf(node)).to.equal(-1)
      expect(parent2.children.indexOf(node)).to.not.equal(-1)

    })

    it('throws an error if adding a parent would create a cycle', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()

      c.setParent(a)
      b.setParent(a)
      a.setParent(node)

      /*
       *   node
       *    |
       *    a
       *   /  \
       *  b    c
       */

      var err = null

      try {
        node.setParent(b)
      } catch(e) {
        err = e
      }

      expect(err).to.be.instanceof(Error)

    })

    it('fires a Node#change event', () => {
      var a = new Node()
        , b = new Node()

      var event = null

      b.on('change', (evt) => {
        event = evt
      })

      b.setParent(a)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:parent')
      expect(event.newParent).to.equal(a)
      expect(event.oldParent).to.equal(null)
    })

    it('fires a Node#change:parent event', () => {
      var a = new Node()
        , b = new Node()

      var event = null

      b.on('change:parent', (evt) => {
        event = evt
      })

      b.setParent(a)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:parent')
      expect(event.newParent).to.equal(a)
      expect(event.oldParent).to.equal(null)
    })
  })

  describe('addChild', () => {

    var node
      , child

    beforeEach(() => {
      node   = new Node()
      child  = new Node()
    })

    it('adds the child node to the parent node\'s children array', () => {
      node.addChild(child)
      expect(node.children).to.contain(child)
    })

    it('sets the parent of the child node to the parent node', () => {
      node.addChild(child)
      expect(child.parent).to.equal(node)
    })

    it('is chainable', () => {
      var r = node.addChild(child)
      expect(r).to.equal(node)
    })

    it('throws an error if the child is not an instanceof Node', () => {
      var err = null
      try {
        node.addChild('foo')
      } catch(e) {
        err = e
      }
      expect(err).to.be.instanceof(Error)
    })

    it('throws an error if adding a child would create a cycle', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()

      node.addChild(a)
      a.addChild(b)
      a.addChild(c)

      /*
       *   node
       *    |
       *    a
       *   /  \
       *  b    c
       */

      var err = null

      try {
        c.addChild(node)
      } catch(e) {
        err = e
      }

      expect(err).to.be.instanceof(Error)

    })

    it('throws an error if the child already has a parent', () => {

      var a = new Node()
        , b = new Node({ parent : a })

      var c = new Node()
        , d = new Node({ parent : c })

      var err = null

      try {
        b.addChild(d)
      } catch(e) {
        err = e
      }
      expect(err).to.be.instanceof(Error)
    })

    it('fires a Node#change event', () => {
      var a = new Node()
        , b = new Node()

      var event = null

      a.on('change', (evt) => {
        event = evt
      })

      a.addChild(b)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:children')
      expect(event.added).to.contain(b)
      expect(event.removed).to.be.empty
    })

    it('fires a Node#change:children event', () => {
      var a = new Node()
        , b = new Node()

      var event = null

      a.on('change:children', (evt) => {
        event = evt
      })

      a.addChild(b)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:children')
      expect(event.added).to.contain(b)
      expect(event.removed).to.be.empty
    })
  })

  describe('addChildren', () => {

    it('adds multiple children from an array', () => {
      var parent   = new Node()
        , children = [ new Node(), new Node(), new Node() ]

      parent.addChildren(children)

      expect(parent.children).to.contain(children[0])
      expect(parent.children).to.contain(children[1])
      expect(parent.children).to.contain(children[2])
    })

    it('works with complex trees', () => {

      var a = new Node()
        , b = new Node({ parent : a })
        , c = new Node({ parent : b })
        , d = new Node({ parent : b })

      var e = new Node()
        , f = new Node({ parent : e })

      var g = new Node()
        , h = new Node({ parent : g })

      /* Initial:
       *    a
       *    |
       *    b
       *   / \
       *  c  (d)
       *
       * [e]
       *  |
       *  f
       *
       * [g]
       *  |
       *  h
       */

      d.addChildren([e, g])

      /* Result:
       *   a
       *   |
       *   b
       *  / \
       * c   d
       *    / \
       *   e   g
       *   |   |
       *   f   h
       */

      expect(e.findRoot()).to.equal(a)
      expect(g.findRoot()).to.equal(a)

      expect(e.parent).to.equal(d)
      expect(g.parent).to.equal(d)

    })

    it('is chainable', () => {
      var parent   = new Node()
        , children = [ new Node(), new Node(), new Node() ]

      var r = parent.addChildren(children)

      expect(r).to.equal(parent)
    })

    it('fires only one Node#change event', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()
        , d = new Node()

      var events = []

      a.on('change', (evt) => {
        events.push(evt)
      })

      a.addChildren([b, c, d])

      expect(events.length).to.equal(1)

      expect(events[0].event).to.equal('change:children')

      expect(events[0].added).to.contain(b)
      expect(events[0].added).to.contain(c)
      expect(events[0].added).to.contain(d)

      expect(events[0].removed).to.be.empty
    })

    it('fires only one Node#change:children event', () => {
      var a = new Node()
        , b = new Node()
        , c = new Node()
        , d = new Node()

      var events = []

      a.on('change:children', (evt) => {
        events.push(evt)
      })

      a.addChildren([b, c, d])

      expect(events.length).to.equal(1)

      expect(events[0].event).to.equal('change:children')

      expect(events[0].added).to.contain(b)
      expect(events[0].added).to.contain(c)
      expect(events[0].added).to.contain(d)

      expect(events[0].removed).to.be.empty
    })
  })

  describe('removeChild', () => {

    it('removes a child from a node', () => {
      var a = new Node()
        , b = new Node({ parent : a })
        , c = new Node({ parent : b })
        , d = new Node({ parent : c })
        , e = new Node({ parent : d })
        , f = new Node({ parent : e })

      /* Initial:
       * a
       * |
       * b
       * |
       * c
       * |
       * d
       * |
       * e
       * |
       * f
       */

      c.removeChild(d)

      /* Result:
       * a
       * |
       * b
       * |
       * c
       *
       * d
       * |
       * e
       * |
       * f
       */

      expect(d.parent).to.be.null
      expect(c.children).to.be.empty

      expect(f.findRoot()).to.equal(d)
      expect(c.findRoot()).to.equal(a)

    })

    it('is chainable', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var r = a.removeChild(b)

      expect(r).to.equal(a)
    })

    it('does nothing if the child does not exist', () => {
      var a = new Node()
        , b = new Node()

      a.removeChild(b)

      expect(a.children).to.be.empty
      expect(b.parent).to.be.null

    })

    it('fires a Node#change event', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var event = null

      a.on('change', (evt) => {
        event = evt
      })

      a.removeChild(b)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:children')
      expect(event.added).to.be.empty
      expect(event.removed).to.contain(b)
    })

    it('fires a Node#change:children event', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var event = null

      a.on('change:children', (evt) => {
        event = evt
      })

      a.removeChild(b)

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:children')
      expect(event.added).to.be.empty
      expect(event.removed).to.contain(b)
    })
  })

  describe('removeParent', () => {
    it('removes a node\'s parent', () => {
      var a = new Node()
        , b = new Node({ parent : a })
      b.removeParent()

      expect(b.parent).to.be.null
    })

    it('removes the node from the old parent\'s children array', () => {
      var a = new Node()
        , b = new Node({ parent : a })
      b.removeParent()

      expect(a.children).to.not.contain(b)
    })

    it('is chainable', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var r = b.removeParent()

      expect(r).to.equal(b)
    })

    it('does nothing if the node has no parent', () => {
      var a = new Node()

      a.removeParent()

      expect(a.parent).to.be.null
    })

    it('fires a Node#change event', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var event = null

      b.on('change', (evt) => {
        event = evt
      })

      b.removeParent()

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:parent')
      expect(event.oldParent).to.equal(a)
      expect(event.newParent).to.be.null
    })

    it('fires a Node#change:parent event', () => {
      var a = new Node()
        , b = new Node({ parent : a })

      var event = null

      b.on('change:parent', (evt) => {
        event = evt
      })

      b.removeParent()

      expect(event).to.not.be.null

      expect(event.event).to.equal('change:parent')
      expect(event.oldParent).to.equal(a)
      expect(event.newParent).to.be.null
    })
  })
})
