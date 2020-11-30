import React from "react";
import type { Editor } from 'editor'

/**
 * Mount the ProseMirror managed DOM onto the React component.
 * Component is wrapped in simple memoization of editor.
 */

function EditorContent({editor}: {editor: Editor}) {
  return (
    <div className="editor-content" 
      ref={ref => (ref && editor && editor.view) && ref.appendChild(editor.view.dom)}
    />
  )
};

export default React.memo(EditorContent);
