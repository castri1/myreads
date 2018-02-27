import React from 'react';
import PropTypes from 'prop-types';

const MoveTo = (props) => (
  <select onChange={props.onChangeBookShelf} value={props.shelf}>
    <option value="default" disabled>Move to...</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none">None</option>
  </select>
);

MoveTo.propTypes = {
  onChangeBookShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
};

export default MoveTo;