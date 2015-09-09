<a name="Scene"></a>
## Scene ⇐ <code>Node</code>
**Kind**: global class  
**Extends:** <code>Node</code>  
**See**

- [Node](./node.md)
- [Constructor Conventions](../conventions-constructor.md)

<a name="new_Scene_new"></a>
### new Scene(container, [framerate], [width], [height])
A scene is the object which attaches to the DOM and can contain any other
             node type.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>String</code> |  | DOM selector |
| [framerate] | <code>Number</code> | <code>30</code> | Max number of frames per second. |
| [width] | <code>Number</code> | <code>0</code> | Width of the scene, in pixels. Defaults to the width of the container or 0. |
| [height] | <code>Number</code> | <code>0</code> | Height of the scene, in pixels. Defaults to the height of the container or 0. |

