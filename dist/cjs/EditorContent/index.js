"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function EditorContent({ editor }) {
    return (react_1.default.createElement("div", { className: "editor-content", ref: ref => (ref && editor && editor.view) && ref.appendChild(editor.view.dom) }));
}
;
exports.default = react_1.default.memo(EditorContent);
