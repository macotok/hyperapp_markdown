import { h } from 'hyperapp';
import PropTypes from 'prop-types';

const Editor = ({ editorItems, actions }) => (
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
      <a
        className="editorButton download"
        download="inputMarkdown.md"
        onclick={e => actions.downloadFile(e.target)}
      >
        downloadFile
      </a>
    </p>
    <p id="editorWrap">
      <textarea
        id="editor"
        placeholder="# input markdown"
        oninput={e => actions.setInput(e.target.value)}
      />
    </p>
  </section>
);

Editor.propTypes = {
  editorItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actions: PropTypes.shape({}).isRequired,
};

export default Editor;
