import { h, app } from 'hyperapp';
import '../scss/style.scss';

const state = {
  preview: '',
};

const actions = {
  setInput: input => state => ({
    preview: input,
  }),
};

const view = (state, actions) => (
  <div>
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
        <div id="preview">{state.preview}</div>
      </section>
    </article>
  </div>
);

app(state, actions, view, document.body);
