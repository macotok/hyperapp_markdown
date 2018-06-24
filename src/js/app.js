import { h, app } from 'hyperapp';
import marked from 'marked';
import '../scss/style.scss';

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
};

const view = (state, actions) => (
  <div>
    <header id="header">
      <h1>Hypertapp Markdown Editor</h1>
      <p id="selectWrap">
        <label>
          CSS type :
          <select
            id="selectCss"
            onchange={e => actions.changeCss(e.target.value)}
          >
            {previewStyles.map(previewStyle => (
              <option value={previewStyle}>{previewStyle}</option>
            ))}
          </select>
        </label>
      </p>
    </header>
    <article id="main">
      <section id="inputMarkdown">
        <p id="editorButtons">
          {editorItems.map(editorItem => (
            <button
              className={`editorButton ${editorItem.name}`}
              value={editorItem.name}
              onclick={e => {actions.addEditorItem(editorItem)}}
            >
              {editorItem.name}
            </button>
          ))}
        </p>
        <p id="editorWrap">
          <textarea
            id="editor"
            placeholder="# input markdown"
            oninput={e => actions.setInput(e.target.value)}
          />
        </p>
      </section>
      <section id="previewHtml">
        <div id="preview" className={state.previewStyle} innerHTML={state.preview}></div>
      </section>
    </article>
  </div>
);

app(state, actions, view, document.body);
