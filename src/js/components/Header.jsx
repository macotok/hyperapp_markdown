import { h } from 'hyperapp';
import PropTypes from 'prop-types';

const Header = ({ previewStyles, changeCss }) => (
  <header id="header">
    <h1>Hypertapp Markdown Editor</h1>
    <p id="selectWrap">
      <label>
        CSS type :
        <select
          id="selectCss"
          onchange={e => changeCss(e.target.value)}
        >
          {previewStyles.map(previewStyle => (
            <option value={previewStyle}>{previewStyle}</option>
          ))}
        </select>
      </label>
    </p>
  </header>
);

Header.propTypes = {
  previewStyles: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeCss: PropTypes.func.isRequired,
};

export default Header;
