"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const editor_1 = require("editor");
const fuse_js_1 = __importDefault(require("fuse.js"));
const react_2 = __importDefault(require("@tippyjs/react"));
require("tippy.js/animations/shift-away.css");
const sprite_svg_1 = __importDefault(require("./sprite.svg"));
const BASIC_COMMANDS = [
    {
        command: (editor) => editor.commands.paragraph(),
        group: "basic",
        name: "Text",
        description: "Write with plain text.",
        spriteId: "text",
        shortcut: "p",
    },
    {
        command: (editor) => editor.commands.heading({ level: 1 }),
        group: "basic",
        name: "Heading 1",
        description: "Large section heading.",
        spriteId: "heading1",
        shortcut: "h1",
    },
    {
        command: (editor) => editor.commands.heading({ level: 2 }),
        group: "basic",
        name: "Heading 2",
        description: "Medium section heading.",
        spriteId: "heading2",
        shortcut: "h2",
    },
    {
        command: (editor) => editor.commands.heading({ level: 3 }),
        group: "basic",
        name: "Heading 3",
        description: "Small section heading.",
        spriteId: "heading3",
        shortcut: "h3",
    },
    {
        command: (editor) => editor.commands.blockquote(),
        group: "basic",
        name: "Blockquote",
        description: "Capture a quote.",
        spriteId: "blockquote",
        shortcut: "quote",
    },
    {
        command: (editor) => editor.commands.horizontalrule(),
        group: "basic",
        name: "Horizontal Rule",
        description: "Separate your content.",
        spriteId: "divider",
        shortcut: "rule",
    },
    {
        command: (editor) => editor.commands.itemlist(),
        group: "list",
        name: "Item List",
        description: "List anything with bullets.",
        spriteId: "item",
        shortcut: "item",
    },
    {
        command: (editor) => editor.commands.enumlist(),
        group: "list",
        name: "Enum List",
        description: "Count with enumerated items.",
        spriteId: "enum",
        shortcut: "enum",
    },
    {
        command: (editor) => editor.commands.todolist(),
        group: "list",
        name: "Todo List",
        description: "Check off items with todos.",
        spriteId: "todo",
        shortcut: "todo",
    },
    {
        command: (editor) => editor.commands.togglelist(),
        group: "list",
        name: "Toggle List",
        description: "Hide and show content.",
        spriteId: "details",
        shortcut: "details"
    },
    {
        command: (editor) => editor.commands.codeblock(),
        group: "advanced",
        name: "Code Block",
        description: "Highlight code snippets.",
        spriteId: "code",
        shortcut: "code",
    },
    {
        command: (editor) => editor.commands.mathblock(),
        group: "advanced",
        name: "Math Block",
        description: "Display math with KaTeX.",
        spriteId: "mathblock",
        shortcut: "math",
    },
];
const initMenuState = { items: BASIC_COMMANDS, index: 0, query: null, range: null };
const menuReducer = (prevState, action) => Object.assign({}, prevState, typeof action === 'function' ? action(prevState) : action);
function EditorCommandMenu({ editor }) {
    const [state, dispatch] = react_1.useReducer(menuReducer, initMenuState);
    const [fuse] = react_1.useState(new fuse_js_1.default(BASIC_COMMANDS, { threshold: 0.10, keys: [{ name: "shortcut", weight: 1.50 }, { name: "name", weight: 1.50 }, { name: "description", weight: 0.50 }] }));
    const onKeyDown = ({ event }) => {
        switch (event.key) {
            case "ArrowUp":
                dispatch(state => ({ index: (state.index + state.items.length - 1) % state.items.length }));
                return true;
            case "ArrowDown":
                dispatch(state => ({ index: (state.index + state.items.length + 1) % state.items.length }));
                return true;
            case "Enter":
                dispatch(state => { deleteAndDispatch(state, state.items[state.index]?.command); return initMenuState; });
                return true;
            default:
                return false;
        }
    };
    react_1.useEffect(() => {
        editor.registerPlugin(editor_1.Autocomplete({
            matcher: /^\/([a-zA-Z0-9]*)?/,
            onEnter: ({ query, range }) => dispatch({ query, range, index: 0, items: !query ? BASIC_COMMANDS : fuse.search(query).map(result => result.item) }),
            onChange: ({ query, range }) => dispatch({ query, range, index: 0, items: !query ? BASIC_COMMANDS : fuse.search(query).map(result => result.item) }),
            onLeave: ({ query, range }) => dispatch(initMenuState),
            onKeyDown,
        }));
    }, [editor]);
    const deleteAndDispatch = (menuState, command) => {
        const { state: { tr }, dispatch } = editor.view;
        dispatch(tr.delete(menuState.range.from, menuState.range.to));
        command && command(editor);
    };
    const getReferenceClientRect = () => {
        const refElement = editor.view.dom.querySelector(`.ProseMirror-autocomplete`);
        if (refElement)
            return Object.assign(refElement.getBoundingClientRect().toJSON(), { width: 0 });
        return new DOMRect(-9999, -9999, 0, 0);
    };
    const tippyProps = {
        getReferenceClientRect,
        arrow: false,
        interactive: true,
        placement: "bottom-start",
        maxWidth: 'none',
        animation: "shift-away",
        duration: 100,
        visible: state.query !== null,
        reference: editor.view.dom,
        theme: "editor-command-menu"
    };
    return (react_1.default.createElement(react_2.default, Object.assign({}, tippyProps, { content: react_1.default.createElement("div", { className: "editor-command-menu" }, state.items.length !== 0
            ? state.items.map(item => {
                const menuItemProps = {
                    className: "menu-item",
                    key: item.name,
                    onClick: () => dispatch(state => { deleteAndDispatch(state, item.command); return initMenuState; }),
                    ...(state.items[state.index] === item) && {
                        className: "menu-item menu-item-active",
                        ref: (elem) => elem && elem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }),
                    }
                };
                const [firstItemOfGroup] = state.items.filter(i => i.group === item.group);
                return [
                    item === firstItemOfGroup && react_1.default.createElement("div", { className: "menu-group-title", key: item.group },
                        item.group,
                        " blocks"),
                    react_1.default.createElement("div", Object.assign({}, menuItemProps),
                        react_1.default.createElement("div", { className: "menu-item-icon" },
                            react_1.default.createElement("svg", null,
                                react_1.default.createElement("use", { href: `${sprite_svg_1.default}#${item.spriteId}` }))),
                        react_1.default.createElement("div", { className: "menu-item-text" },
                            react_1.default.createElement("div", { className: "menu-item-name" }, item.name),
                            react_1.default.createElement("div", { className: "menu-item-info" }, item.description)))
                ];
            })
            : react_1.default.createElement("div", { className: "menu-item menu-item-empty", onClick: () => dispatch(state => { deleteAndDispatch(state, undefined); return initMenuState; }) }, "No results")) })));
}
exports.default = EditorCommandMenu;
