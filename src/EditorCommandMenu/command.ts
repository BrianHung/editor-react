import type { Editor } from "editor"

export default [

  {
    command: (editor: Editor) => editor.commands.paragraph(),
    group: "basic",
    name: "Text",
    description: "Write with plain text.",
    spriteId: "text"
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 1}),
    group: "basic",
    name: "Heading 1",
    description: "Large section heading.",
    spriteId: "heading1"
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 2}),
    group: "basic",
    name: "Heading 2",
    description: "Medium section heading.",
    spriteId: "heading2"
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 3}),
    group: "basic",
    name: "Heading 3",
    description: "Small section heading.",
    spriteId: "heading3"
  },

  {
    command: (editor: Editor) => editor.commands.blockquote(),
    group: "basic",
    name: "Blockquote",
    description: "Capture a quote.",
    spriteId: "blockquote"
  },

  {
    command: (editor: Editor) => editor.commands.divider(),
    group: "basic",
    name: "Divider",
    description: "Separate your content.",
    spriteId: "divider"
  },

  {
    command: (editor: Editor) => editor.commands.itemlist(),
    group: "list",
    name: "Item List",
    description: "List anything with bullets.",
    spriteId: "item"
  },
  {
    command: (editor: Editor) => editor.commands.enumlist(),
    group: "list",
    name: "Enum List",
    description: "Count with enumerated items.",
    spriteId: "enum"
  },
  {
    command: (editor: Editor) => editor.commands.todolist(),
    group: "list",
    name: "Todo List",
    description: "Check off items with todos.",
    spriteId: "todo",
  },
  {
    command: (editor: Editor) => editor.commands.togglelist(),
    group: "list",
    name: "Toggle List",
    description: "Hide and show content.",
    spriteId: "details"
  },
  {
    command: (editor: Editor) => editor.commands.codeblock(),
    group: "advanced",
    name: "Code Block",
    description: "Highlight code snippets.",
    spriteId: "code",
  },
  {
    command: (editor: Editor) => editor.commands.mathblock(),
    group: "advanced",
    name: "Math Block",
    description: "Display math with KaTeX.",
    spriteId: "mathblock"
  },
] as CommandItem[];


export interface CommandItem {
  command: Function;
  group: string;
  name: string;
  description: string;
  spriteId: string;
}