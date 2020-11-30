# editor-react-components
This repository contains React components to be used with https://github.com/BrianHung/editor.

### Example Usage

```jsx
import { Editor } from "editor";
import { EditorContent } from "editor-react-components";

class ReactEditor extends React.Component {
  super () {
    this.editor = new Editor();
  }
  render () {
    return (
      <div className="editor">
        <EditorContent editor={this.editor}/>
      </div>
    )
  }
}
```
