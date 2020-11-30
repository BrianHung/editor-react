import React from "react"
import "./editor.css"

import { 
  Editor,
  Doc,
  Text,
  Title,
  TitleDoc,
  HardBreak,
  Blockquote,
  HorizontalRule,
  Paragraph,
  CodeBlock,
  MathBlock,
  Heading,
  Math,
  Figcaption,
  Figure,
  Image,
  ListItem,
  ItemList,
  EnumList,
  TodoItem,
  TodoList,
  ToggleItem,
  ToggleList,
  Highlight,
  TrailingNode,
  History,
  Placeholder,
  Bold,
  Code,
  Underline,
  Italic,
  Strike,
  Link,
  SyntaxHighlight,
  Punctuation,
  MarkdownDragDrop,
  Keymaps,
  FocusMode,
  HorizontalRule,
} from 'editor'

import { EditorContent, EditorCommandMenu, EditorEmojiPicker } from "../src"
import "../src/EditorCommandMenu/style.css"

import applyDevTools from "prosemirror-dev-tools"


export default class EditorComponent extends React.PureComponent<{}, {editor: Editor}> {

  constructor(props: {}) {
    super(props)

    this.state = {
      editor: new Editor({
        onUpdate: (tr) => {
          // console.log("onupdate", tr, props, this.state.editor, this.state.editor.JSON);
        },
        topNode: "titledoc",
        content: JSON.parse(localStorage.getItem('content')),
        extensions: [

          new Text(),
          new Paragraph(),
          new Doc(), 

          new TitleDoc(),
          new Title(),
          new Punctuation(),
          // new Collaboration({ydoc: this.ydoc, prov: this.prov, user}),
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new HorizontalRule(),
          new Heading(),


          new Math(),
          new MathBlock(),

          new ListItem(),
          new ItemList(),
          new EnumList(),

          new TodoItem(),
          new TodoList(),

          new ToggleItem(),
          new ToggleList(),
        
          new Figcaption(),
          new Image(),
          new Figure(),

          new Bold(),
          new Code(),
          new Strike(),
          new Italic(),
          new Underline(),
          new Link(),
          new Highlight(),
          
          new History(),
          new MarkdownDragDrop(),
          new FocusMode(),
          new Placeholder(),
          new SyntaxHighlight(),
          new Keymaps()
        ]
      })
    }
  }

  componentDidMount() {
    applyDevTools(this.state.editor.view);
  }

  render () {
    return (
      <div className="editor">
        <EditorContent editor={this.state.editor}/>
        <EditorCommandMenu editor={this.state.editor}/>
        <EditorEmojiPicker editor={this.state.editor}/>
      </div>
    )
  }
}