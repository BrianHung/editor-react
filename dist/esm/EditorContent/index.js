import React from "react";
function EditorContent({ editor }) {
    return (React.createElement("div", { className: "editor-content", ref: ref => (ref && editor && editor.view) && ref.appendChild(editor.view.dom) }));
}
;
export default React.memo(EditorContent);
