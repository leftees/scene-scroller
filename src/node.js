/*
 * @module Node
 */
'use strict';

var EventEmitter  = require('./eventemitter')

var util    = require('./util')
  , symbols = require('./symbols')

var local =
  { true  : Symbol('true')
  , false : Symbol('false')
  }

/**
 * Base implementation of the SceneScroller tree data hierarchy.
 *
 * @class Node
 * @extends EventEmitter
 *
 * @see [EventEmitter](./eventemitter.md)
 * @see [Constructor Conventions](../conventions-constructor.md)
 *
 * @param {Node} [parent=null] The parent of this Node. Can be an instance of Node or any of its descendant classes.
 *
 */
class Node extends EventEmitter {
  constructor() {

    // Any options we need and their default values, if applicable
    var defaults =
      { parent   : null
      , children : []
      }

    var [ opts, rest ] = util.parseOpts(arguments[0], defaults)

    // Call super constructor with any options we didn't snag
    super(rest)

    // Array to contain the names of any default events, defined below.
    var events = []

    /**
     * The Node was changed in some way.
     * This event is fire any time a `change:*` event is heard.
     *
     * @event Node#change
     * @type {Object}
     */
    events.push('change')

    /**
     * @event Node#change:parent
     *
     * @type     {object}
     *
     * @property {String} event=change:parent The name of the event
     *
     * @property {Node}   newParent The new parent
     * @property {Node}   oldParent The old parent
     */
    events.push('change:parent')

    /**
     * @event Node#change:children
     *
     * @type     {object}
     * @property {String} event=change:children The name of the event
     *
     * @property {Node[]} added   Newly added children
     * @property {Node[]} removed Newly removed children
     */
    events.push('change:children')

    // Define our default events so that we can listen for them with RegExps
    this.defineEvents(events)

    // Emit a `change` event any time a `change:*` event is fired, passing the original
    // data object along
    this.on(/^(change:)(.+)$/, (e) => {
      this.emit('change', e)
    })

    this.parent   = null
    this.children = []

    this.setParent(opts.parent)
    this.addChildren(opts.children)

  }

  /**
   * Detect a potential cycle if a given node were to be added as a child of
   * another node.
   *
   * @param {Node} testNode The node to test against for a cycle.
   * @return {Bool}         `true` if a cycle would exist, else `false`.
   */
  detectCycle(testNode) {
    if(testNode.findRoot() === this.findRoot()) {
      return true
    }
    return false
  }

  /**
   * Find the root node of this node's tree
   *
   * @return {Node} The root node
   */
  findRoot() {
    var ancestor = this

    while(ancestor.parent !== null) {
      ancestor = ancestor.parent
    }

    return ancestor
  }

  /**
   * Set the Node's parent. This should be thought of as adding the Node
   * as a child to the desired parent. As a result, the Node will be added to the new
   * parent's children array via `.addChild()`.
   *
   * If the Node already has a parent, it will be replaced and the old parent will have
   * the Node removed from its children array via `.removeChild()`.
   *
   * @param  {Node} parent         An instance of Node or one of its descendants to become the
   *                               new parent. If `null` is passed, the method will silently
   *                               return without doing anything.
   *
   * @param {Symbol} [addChild=local.true] PRIVATE: If `!== local.false`, this node
   *                                              will be added as a child of the new parent
   *                                              node; if false, it will not be set. This is not
   *                                              intended for external use.
   *
   * @return {Node}        Returns the node itself, enabling chaining.
   *
   * @throws {TypeError}   If the parent argument is not an instance of Node.
   * @throws {Error}       If the operation would cause a cycle in the tree.
   *
   * @fires Node#change
   * @fires Node#change:parent
   **/
  setParent(parent, { addChild = local.true }={}) {
    if(parent === null) {
      return this
    }
    if(!(parent instanceof Node)) {
      throw new TypeError('Parent must be instanceof Node.')
      return this
    }

    if(this.parent !== null) {
      this.parent.removeChild(this)
    }

    if(addChild !== local.false) {
      try {
        parent.addChild(this, { setParent : local.false })
      } catch(e) {
        throw new Error('Cannot set parent: Cycle would be created.')
        return this
      }
    }

    var oldParent = this.parent

    this.parent = parent

    this.emit('change:parent',
      { event     : 'change:parent'
      , newParent : this.parent
      , oldParent : oldParent
      }
    )

    return this
  }

  /**
   * Add a child to this Node's children array. Also sets `.parent` of the
   * new child to point to this node.
   *
   * @param {Node} child            The child to add.
   *
   * @return {Node}      Returns the node itself, enabling chaining.
   *
   * @throws {TypeError} If the child argument is not an instance of Node.
   * @throws {Error}     If the operation would cause a cycle in the tree.
   * @throws {Error}     If the node already has a parent.
   *
   * @fires Node#change
   * @fires Node#change:children
   */
  addChild(child, { setParent = local.true, emitEvent = local.true }={}) {
    if(!(child instanceof Node)) {
      throw new TypeError('Child must be instanceof Node.')
      return this
    }

    if(this.detectCycle(child)) {
      throw new Error('Cannot add child: Cycle would be created.')
      return this
    }

    if(child.parent !== null) {
      throw new Error('Cannot add child: Child already has a parent.')
      return this
    }

    if(setParent !== local.false) {
      child.setParent(this, { addChild : local.false })
    }

    this.children.push(child)

    if(emitEvent !== local.false) {
      this.emit('change:children',
        { event   : 'change:children'
        , added   : [ child ]
        , removed : []
        }
      )
    }
    return this
  }

  /**
   * Add multiple children at once.
   *
   * @param {Node[]} children Array of children to add
   *
   * @return {Node}  Returns the node itself, enabling chaining.
   *
   * @throws {Error} If the operation would cause a cycle in the tree.
   * @throws {Error} If a node in the children array already has a parent.
   *
   * @fires Node#change
   * @fires Node#change:children
   *
   * @todo Verify that children were actually added before emitting an event that says they
   *       were all successfully added.
   */
  addChildren(children) {
    for(let child of children) {
      this.addChild(child, { emitEvent : local.false })
    }
    this.emit('change:children',
      { event   : 'change:children'
      , added   : children
      , removed : []
      }
    )
    return this
  }

  /**
   * Remove a child from the Node. Also removes itself as a parent from the old
   * child.
   *
   * @param {Node} child The child object to remove
   *
   * @param {Symbol} [removeParent=local.true] PRIVATE: If `!== local.false`, call
   *                                                  `.removeParent()` on the old child.
   *                                                  Not intended for external use.
   *
   * @return {Node}      Returns the node itself, enabling chaining.
   *
   * @throws {TypeError} If the child argument is not an instance of Node.
   *
   * @fires Node#change
   * @fires Node#change:children
   */
  removeChild(child, { removeParent = local.true }={}) {
    var childIndex = this.children.indexOf(child)

    if(!(child instanceof Node)) {
      throw new TypeError('Child must be instanceof Node.')
      return this
    }

    if(childIndex === -1) {
      return this
    }

    if(removeParent !== local.false) {
      child.removeParent({ removeChild : local.false })
    }

    this.children.splice(childIndex, 1)

    this.emit('change:children',
      { event   : 'change:children'
      , added   : [ ]
      , removed : [ child ]
      }
    )

    return this
  }

  /**
   * Remove the Node's parent. Also removes the node from the old parent's
   * children array.
   *
   * @param {Symbol} [removeChild=local.true] PRIVATE: If `!== local.false`,
   *                                                 `.removeChild()` on the old parent.
   *                                                 Not intended for external use.
   *
   * @return {Node}      Returns the node itself, enabling chaining.
   *
   * @fires Node#change
   * @fires Node#change:parent
   */
  removeParent({ removeChild = local.true }={}) {
    if(this.parent && removeChild !== local.false) {
      this.parent.removeChild(this, { removeParent : local.false })
    }

    var oldParent = this.parent

    this.parent = null

    this.emit('change:parent',
      { event     : 'change:parent'
      , newParent : this.parent
      , oldParent : oldParent
      }
    )

    return this
  }

}

module.exports = Node
