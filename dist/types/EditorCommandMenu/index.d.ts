/// <reference types="react" />
import type { Editor } from "editor";
import 'tippy.js/animations/shift-away.css';
export interface CommandItem {
    command: Function;
    group: string;
    name: string;
    description: string;
    spriteId: string;
    shortcut: string;
}
export default function EditorCommandMenu({ editor }: {
    editor: Editor;
}): JSX.Element;
//# sourceMappingURL=index.d.ts.map