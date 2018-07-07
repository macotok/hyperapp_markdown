import { h, app } from 'hyperapp';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Editor from './components/Editor';
import Header from './components/Header';
import Preview from './components/Preview';
import '../scss/style.scss';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: code => (
    highlight.highlightAuto(code).value
  ),
});

const editorItems = [
  {
    name: 'strong',
    before: '**',
    after: '**',
  },
  {
    name: 'italic',
    before: '*',
    after: '*',
  },
  {
    name: 'strikethrough',
    before: '~~',
    after: '~~',
  },
  {
    name: 'link',
    before: '[',
    after: ']()',
  },
];

const previewStyles = ['github', 'air'];
const state = {
  preview: '',
  previewStyle: previewStyles[0],
};

const actions = {
  setInput: input => state => ({
    preview: marked(input),
  }),
  changeCss: input => state => ({
    previewStyle: input,
  }),
  addEditorItem: itemType => (state, actions) => {
    const editor = document.getElementById('editor');
    const oldInput = editor.value;
    const posStart = editor.selectionStart;
    const posEnd = editor.selectionEnd;

    editor.value = oldInput.substring(0, posStart)
      + itemType.before
      + oldInput.substring(posStart, posEnd)
      + itemType.after
      + oldInput.substring(posEnd, oldInput.length);

    editor.focus();
    editor.selectionStart = posStart + itemType.before.length;
    editor.selectionEnd = posStart
      + itemType.before.length
      + oldInput.substring(posStart, posEnd).length;

    actions.setInput(editor.value);
  },
  downloadFile: trigger => state => {
    const inputText = document.getElementById('editor').value;
    const file = new Blob([inputText], { type: 'text/markdown' })
    const fileURL = URL.createObjectURL(file);
    trigger.href = fileURL;
  },
};

const view = (state, actions) => (
  <div>
    <Header
      previewStyles={previewStyles}
      changeCss={actions.changeCss}
    />
    <article id="main">
      <Editor editorItems={editorItems} actions={actions} />
      <Preview state={state} />
    </article>
  </div>
);

app(state, actions, view, document.body);
