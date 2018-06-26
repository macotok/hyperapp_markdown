import { h } from 'hyperapp';
import PropTypes from 'prop-types';

const Preview = ({ state }) => (
  <section id="previewHtml">
    <div
      id="preview"
      className={state.previewStyle}
      innerHTML={state.preview}
    >
    </div>
  </section>
);

Preview.propTypes = {
  state: PropTypes.shape({}).isRequired,
};

export default Preview;
