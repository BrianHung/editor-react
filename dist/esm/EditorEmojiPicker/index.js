import { EmojiPicker, unifiedToNative, throttleIdleTask } from "react-twemoji-picker";
import emojiData from "react-twemoji-picker/data/twemoji.json";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { Autocomplete } from "editor";
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/shift-away.css';
export default function EditorEmojiPicker({ editor }) {
    const [range, setRange] = useState(null);
    const picker = useRef();
    const throttledQuery = useCallback(throttleIdleTask((query) => picker.current?.search(query)), [picker.current]);
    const onKeyDown = ({ event }) => {
        if (!["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key))
            return false;
        picker.current.handleKeyDownScroll(event);
        event.key == "Enter" && picker.current.search("");
        return true;
    };
    useEffect(() => {
        editor.registerPlugin(Autocomplete({
            matcher: /\:([a-zA-Z]+)/,
            onEnter: ({ query, range }) => { setRange(range); throttledQuery(query.toLowerCase()); },
            onChange: ({ query, range }) => { setRange(range); throttledQuery(query.toLowerCase()); },
            onLeave: ({ query, range }) => { setRange(null); },
            onKeyDown,
        }));
    }, [editor]);
    const onEmojiSelect = (emoji) => {
        const { state: { tr }, dispatch } = editor.view;
        dispatch(tr.insertText(unifiedToNative(emoji.unicode), range.from, range.to));
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
        emojiData,
        onEmojiSelect,
        showNavbar: false,
        showFooter: false,
        collapseHeightOnSearch: true,
        numberScrollRows: 6,
        emojisPerRow: 10,
    };
    return (React.createElement(Tippy, Object.assign({}, tippyProps, { content: React.createElement("div", { className: "editor-emoji-menu" },
            React.createElement(EmojiPicker, Object.assign({}, emojiPickerProps))) })));
}
