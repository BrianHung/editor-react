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
const react_twemoji_picker_1 = require("react-twemoji-picker");
const twemoji_json_1 = __importDefault(require("react-twemoji-picker/data/twemoji.json"));
const react_1 = __importStar(require("react"));
const editor_1 = require("editor");
const react_2 = __importDefault(require("@tippyjs/react"));
require("tippy.js/animations/shift-away.css");
function EditorEmojiPicker({ editor }) {
    const [range, setRange] = react_1.useState(null);
    const picker = react_1.useRef();
    const throttledQuery = react_1.useCallback(react_twemoji_picker_1.throttleIdleTask((query) => picker.current?.search(query)), [picker.current]);
    const onKeyDown = ({ event }) => {
        if (!["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key))
            return false;
        picker.current.handleKeyDownScroll(event);
        event.key == "Enter" && picker.current.search("");
        return true;
    };
    react_1.useEffect(() => {
        editor.registerPlugin(editor_1.Autocomplete({
            matcher: /\:([a-zA-Z]+)/,
            onEnter: ({ query, range }) => { setRange(range); throttledQuery(query.toLowerCase()); },
            onChange: ({ query, range }) => { setRange(range); throttledQuery(query.toLowerCase()); },
            onLeave: ({ query, range }) => { setRange(null); },
            onKeyDown,
        }));
    }, [editor]);
    const onEmojiSelect = (emoji) => {
        const { state: { tr }, dispatch } = editor.view;
        dispatch(tr.insertText(react_twemoji_picker_1.unifiedToNative(emoji.unicode), range.from, range.to));
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
        visible: range !== null,
        reference: editor.view.dom,
        theme: "editor-command-menu"
    };
    const emojiPickerProps = {
        ref: picker,
        emojiData: twemoji_json_1.default,
        onEmojiSelect,
        showNavbar: false,
        showFooter: false,
        collapseHeightOnSearch: true,
        numberScrollRows: 6,
        emojisPerRow: 10,
    };
    return (react_1.default.createElement(react_2.default, Object.assign({}, tippyProps, { content: react_1.default.createElement("div", { className: "editor-emoji-menu" },
            react_1.default.createElement(react_twemoji_picker_1.EmojiPicker, Object.assign({}, emojiPickerProps))) })));
}
exports.default = EditorEmojiPicker;
