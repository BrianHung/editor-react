import React, { useReducer, useState, useEffect } from "react"
import type { Editor } from "editor"
import { Autocomplete } from "editor"
import Fuse from 'fuse.js';
import Tippy from '@tippyjs/react';
import { Placement } from "tippy.js";
import 'tippy.js/animations/shift-away.css';
import sprite from "./sprite.svg"

export interface CommandItem {
  command: Function;
  group: string;
  name: string;
  description: string;
  spriteId: string;
  shortcut: string;
}

const BASIC_COMMANDS = [

  {
    command: (editor: Editor) => editor.commands.paragraph(),
    group: "basic",
    name: "Text",
    description: "Write with plain text.",
    spriteId: "text",
    shortcut: "p",
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 1}),
    group: "basic",
    name: "Heading 1",
    description: "Large section heading.",
    spriteId: "heading1",
    shortcut: "h1",
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 2}),
    group: "basic",
    name: "Heading 2",
    description: "Medium section heading.",
    spriteId: "heading2",
    shortcut: "h2",
  },

  {
    command: (editor: Editor) => editor.commands.heading({level: 3}),
    group: "basic",
    name: "Heading 3",
    description: "Small section heading.",
    spriteId: "heading3",
    shortcut: "h3",
  },

  {
    command: (editor: Editor) => editor.commands.blockquote(),
    group: "basic",
    name: "Blockquote",
    description: "Capture a quote.",
    spriteId: "blockquote",
    shortcut: "quote",
  },

  {
    command: (editor: Editor) => editor.commands.horizontalrule(),
    group: "basic",
    name: "Horizontal Rule",
    description: "Separate your content.",
    spriteId: "divider",
    shortcut: "rule",
  },

  {
    command: (editor: Editor) => editor.commands.itemlist(),
    group: "list",
    name: "Item List",
    description: "List anything with bullets.",
    spriteId: "item",
    shortcut: "item",
  },
  {
    command: (editor: Editor) => editor.commands.enumlist(),
    group: "list",
    name: "Enum List",
    description: "Count with enumerated items.",
    spriteId: "enum",
    shortcut: "enum",
  },
  {
    command: (editor: Editor) => editor.commands.todolist(),
    group: "list",
    name: "Todo List",
    description: "Check off items with todos.",
    spriteId: "todo",
    shortcut: "todo",
  },
  {
    command: (editor: Editor) => editor.commands.togglelist(),
    group: "list",
    name: "Toggle List",
    description: "Hide and show content.",
    spriteId: "details",
    shortcut: "details"
  },
  {
    command: (editor: Editor) => editor.commands.codeblock(),
    group: "advanced",
    name: "Code Block",
    description: "Highlight code snippets.",
    spriteId: "code",
    shortcut: "code",
  },
  {
    command: (editor: Editor) => editor.commands.mathblock(),
    group: "advanced",
    name: "Math Block",
    description: "Display math with KaTeX.",
    spriteId: "mathblock",
    shortcut: "math",
  },
] as CommandItem[];

const initMenuState = {items: BASIC_COMMANDS, index: 0, query: null, range: null}
const menuReducer = (prevState, action) => Object.assign({}, prevState, typeof action === 'function' ? action(prevState) : action)

export default function EditorCommandMenu({editor}: {editor: Editor}): JSX.Element {

  const [state, dispatch] = useReducer(menuReducer, initMenuState);
  const [fuse] = useState(new Fuse(BASIC_COMMANDS, { threshold: 0.10, keys: [{name: "shortcut", weight: 1.50}, {name: "name", weight: 1.50}, {name: "description", weight: 0.50}]}));

  const onKeyDown = ({event}: {event: KeyboardEvent}) => {
    switch (event.key) {
      case "ArrowUp":
        dispatch(state => ({index: (state.index + state.items.length - 1) % state.items.length}))
        return true
      case "ArrowDown":
        dispatch(state => ({index: (state.index + state.items.length + 1) % state.items.length}))
        return true
      case "Enter":
        dispatch(state => {deleteAndDispatch(state, state.items[state.index]?.command); return initMenuState })
        return true
      default:
        return false
    }
  }

  useEffect(() => {
    editor.registerPlugin(Autocomplete({
      matcher: /^\/([a-zA-Z0-9]*)?/,
      onEnter: ({query, range}) => dispatch({query, range, index: 0, items: !query ? BASIC_COMMANDS : fuse.search(query).map(result => result.item)}),
      onChange:({query, range}) => dispatch({query, range, index: 0, items: !query ? BASIC_COMMANDS : fuse.search(query).map(result => result.item)}),
      onLeave: ({query, range}) => dispatch(initMenuState),
      onKeyDown,
    }))
  }, [editor]);

  
  const deleteAndDispatch = (menuState, command: Function | undefined): void => {
    const {state: {tr}, dispatch} = editor.view;
    dispatch(tr.delete(menuState.range.from, menuState.range.to));
    command && command(editor);
  }

  const getReferenceClientRect = (): DOMRect => {
    const refElement = editor.view.dom.querySelector(`.ProseMirror-autocomplete`);
    // avoid shifts in transformX between onChange
    if (refElement) return Object.assign(refElement.getBoundingClientRect().toJSON(), {width: 0})
    return new DOMRect(-9999, -9999, 0, 0);
  }

  const tippyProps = {
    getReferenceClientRect,
    arrow: false,
    interactive: true,
    placement: "bottom-start" as Placement,
    maxWidth: 'none',
    animation: "shift-away",
    duration: 100,
    visible: state.query !== null,
    reference: editor.view.dom,
    theme: "editor-command-menu"
  }

  return (
    <Tippy {...tippyProps}
      content = {
        <div className="editor-command-menu">
          { state.items.length !== 0
            ? state.items.map(item => {

                const menuItemProps = {
                  className: "menu-item",
                  key: item.name,
                  onClick: () => dispatch(state => {deleteAndDispatch(state, item.command); return initMenuState;}),
                  ...(state.items[state.index] === item) && {
                    className: "menu-item menu-item-active",
                    ref: (elem: HTMLElement) => elem && elem.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"}),
                  }
                }

                const [ firstItemOfGroup ] = state.items.filter(i => i.group === item.group)

                return [
                  item === firstItemOfGroup && <div className="menu-group-title" key={item.group}>{item.group} blocks</div>,
                  <div {...menuItemProps}>
                    <div className="menu-item-icon">
                      <svg><use href={`${sprite}#${item.spriteId}`}></use></svg>
                    </div>
                    <div className="menu-item-text">
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-info">{item.description}</div>
                    </div>
                  </div>
                ]
              })
            : <div className="menu-item menu-item-empty" onClick={() => dispatch(state => {deleteAndDispatch(state, undefined); return initMenuState;})}>No results</div>
          }   
        </div>
      }
    />
  )
}


