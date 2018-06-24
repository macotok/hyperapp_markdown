import { h, app } from 'hyperapp';
import marked from 'marked';
import '../scss/style.scss';

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
