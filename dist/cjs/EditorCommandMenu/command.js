"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        command: (editor) => editor.commands.paragraph(),
        group: "basic",
        name: "Text",
        description: "Write with plain text.",
        spriteId: "text"
    },
    {
        command: (editor) => editor.commands.heading({ level: 1 }),
        group: "basic",
        name: "Heading 1",
        description: "Large section heading.",
        spriteId: "heading1"
    },
    {
        command: (editor) => editor.commands.heading({ level: 2 }),
        group: "basic",
        name: "Heading 2",
        description: "Medium section heading.",
        spriteId: "heading2"
    },
    {
        command: (editor) => editor.commands.heading({ level: 3 }),
        group: "basic",
        name: "Heading 3",
        description: "Small section heading.",
        spriteId: "heading3"
    },
    {
        command: (editor) => editor.commands.blockquote(),
        group: "basic",
        name: "Blockquote",
        description: "Capture a quote.",
        spriteId: "blockquote"
    },
    {
        command: (editor) => editor.commands.divider(),
        group: "basic",
        name: "Divider",
        description: "Separate your content.",
        spriteId: "divider"
    },
    {
        command: (editor) => editor.commands.itemlist(),
        group: "list",
        name: "Item List",
        description: "List anything with bullets.",
        spriteId: "item"
    },
    {
        command: (editor) => editor.commands.enumlist(),
        group: "list",
        name: "Enum List",
        description: "Count with enumerated items.",
        spriteId: "enum"
    },
    {
        command: (editor) => editor.commands.todolist(),
        group: "list",
        name: "Todo List",
        description: "Check off items with todos.",
        spriteId: "todo",
    },
    {
        command: (editor) => editor.commands.togglelist(),
        group: "list",
        name: "Toggle List",
        description: "Hide and show content.",
        spriteId: "details"
    },
    {
        command: (editor) => editor.commands.codeblock(),
        group: "advanced",
        name: "Code Block",
        description: "Highlight code snippets.",
        spriteId: "code",
    },
    {
        command: (editor) => editor.commands.mathblock(),
        group: "advanced",
        name: "Math Block",
        description: "Display math with KaTeX.",
        spriteId: "mathblock"
    },
];
