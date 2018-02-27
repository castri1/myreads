import React from 'react';
import PropTypes from 'prop-types';
import MoveTo from './MoveTo';

const Book = (props) => {
  const { book: { title, authors, shelf, imageLinks }, onChangeBookShelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <MoveTo shelf={shelf || 'default'} onChangeBookShelf={onChangeBookShelf} />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
};

export default Book;
