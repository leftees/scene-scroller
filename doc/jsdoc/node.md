<a name="Node"></a>
## Node ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends:** <code>EventEmitter</code>  
**See**

- [EventEmitter](./eventemitter.md)
- [Constructor Conventions](../conventions-constructor.md)


* [Node](#Node) ⇐ <code>EventEmitter</code>
  * [new Node([parent])](#new_Node_new)
  * [.detectCycle(testNode)](#Node+detectCycle) ⇒ <code>Bool</code>
  * [.findRoot()](#Node+findRoot) ⇒ <code>[Node](#Node)</code>
  * [.setParent(parent, [addChild])](#Node+setParent) ⇒ <code>[Node](#Node)</code>
  * [.addChild(child)](#Node+addChild) ⇒ <code>[Node](#Node)</code>
  * [.addChildren(children)](#Node+addChildren) ⇒ <code>[Node](#Node)</code>
  * [.removeChild(child, [removeParent])](#Node+removeChild) ⇒ <code>[Node](#Node)</code>
  * [.removeParent([removeChild])](#Node+removeParent) ⇒ <code>[Node](#Node)</code>
  * ["change"](#Node+event_change)
  * ["change:parent"](#Node+change_parent)
  * ["change:children"](#Node+change_children)

<a name="new_Node_new"></a>
### new Node([parent])
Base implementation of the SceneScroller tree data hierarchy.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parent] | <code>[Node](#Node)</code> | <code></code> | The parent of this Node. Can be an instance of Node or any of its descendant classes. |

<a name="Node+detectCycle"></a>
### node.detectCycle(testNode) ⇒ <code>Bool</code>
Detect a potential cycle if a given node were to be added as a child of
another node.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>Bool</code> - `true` if a cycle would exist, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| testNode | <code>[Node](#Node)</code> | The node to test against for a cycle. |

<a name="Node+findRoot"></a>
### node.findRoot() ⇒ <code>[Node](#Node)</code>
Find the root node of this node's tree

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - The root node  
<a name="Node+setParent"></a>
### node.setParent(parent, [addChild]) ⇒ <code>[Node](#Node)</code>
Set the Node's parent. This should be thought of as adding the Node
as a child to the desired parent. As a result, the Node will be added to the new
parent's children array via `.addChild()`.

If the Node already has a parent, it will be replaced and the old parent will have
the Node removed from its children array via `.removeChild()`.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - Returns the node itself, enabling chaining.  
**Throws**:

- <code>TypeError</code> If the parent argument is not an instance of Node.
- <code>Error</code> If the operation would cause a cycle in the tree.

**Emits**: <code>[change](#Node+event_change)</code>, <code>[change:parent](#Node+change_parent)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parent | <code>[Node](#Node)</code> |  | An instance of Node or one of its descendants to become the                               new parent. If `null` is passed, the method will silently                               return without doing anything. |
| [addChild] | <code>Symbol</code> | <code>local.true</code> | PRIVATE: If `!== local.false`, this node                                              will be added as a child of the new parent                                              node; if false, it will not be set. This is not                                              intended for external use. |

<a name="Node+addChild"></a>
### node.addChild(child) ⇒ <code>[Node](#Node)</code>
Add a child to this Node's children array. Also sets `.parent` of the
new child to point to this node.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - Returns the node itself, enabling chaining.  
**Throws**:

- <code>TypeError</code> If the child argument is not an instance of Node.
- <code>Error</code> If the operation would cause a cycle in the tree.
- <code>Error</code> If the node already has a parent.

**Emits**: <code>[change](#Node+event_change)</code>, <code>[change:children](#Node+change_children)</code>  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>[Node](#Node)</code> | The child to add. |

<a name="Node+addChildren"></a>
### node.addChildren(children) ⇒ <code>[Node](#Node)</code>
Add multiple children at once.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - Returns the node itself, enabling chaining.  
**Throws**:

- <code>Error</code> If the operation would cause a cycle in the tree.
- <code>Error</code> If a node in the children array already has a parent.

**Emits**: <code>[change](#Node+event_change)</code>, <code>[change:children](#Node+change_children)</code>  
**Todo**

- [ ] Verify that children were actually added before emitting an event that says they
      were all successfully added.


| Param | Type | Description |
| --- | --- | --- |
| children | <code>[Array.&lt;Node&gt;](#Node)</code> | Array of children to add |

<a name="Node+removeChild"></a>
### node.removeChild(child, [removeParent]) ⇒ <code>[Node](#Node)</code>
Remove a child from the Node. Also removes itself as a parent from the old
child.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - Returns the node itself, enabling chaining.  
**Throws**:

- <code>TypeError</code> If the child argument is not an instance of Node.

**Emits**: <code>[change](#Node+event_change)</code>, <code>[change:children](#Node+change_children)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| child | <code>[Node](#Node)</code> |  | The child object to remove |
| [removeParent] | <code>Symbol</code> | <code>local.true</code> | PRIVATE: If `!== local.false`, call                                                  `.removeParent()` on the old child.                                                  Not intended for external use. |

<a name="Node+removeParent"></a>
### node.removeParent([removeChild]) ⇒ <code>[Node](#Node)</code>
Remove the Node's parent. Also removes the node from the old parent's
children array.

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: <code>[Node](#Node)</code> - Returns the node itself, enabling chaining.  
**Emits**: <code>[change](#Node+event_change)</code>, <code>[change:parent](#Node+change_parent)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [removeChild] | <code>Symbol</code> | <code>local.true</code> | PRIVATE: If `!== local.false`,                                                 `.removeChild()` on the old parent.                                                 Not intended for external use. |

<a name="Node+event_change"></a>
### "change"
The Node was changed in some way.
This event is fire any time a `change:*` event is heard.

**Kind**: event emitted by <code>[Node](#Node)</code>  
<a name="Node+change_parent"></a>
### "change:parent"
**Kind**: event emitted by <code>[Node](#Node)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>String</code> | <code>change:parent</code> | The name of the event |
| newParent | <code>[Node](#Node)</code> |  | The new parent |
| oldParent | <code>[Node](#Node)</code> |  | The old parent |

<a name="Node+change_children"></a>
### "change:children"
**Kind**: event emitted by <code>[Node](#Node)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>String</code> | <code>change:children</code> | The name of the event |
| added | <code>[Array.&lt;Node&gt;](#Node)</code> |  | Newly added children |
| removed | <code>[Array.&lt;Node&gt;](#Node)</code> |  | Newly removed children |

