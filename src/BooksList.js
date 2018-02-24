import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const bookShelves = [
  { title: 'Currently Reading', shelf: 'currentlyReading' },
  { title: 'Want to Read', shelf: 'wantToRead' },
  { title: 'Read', shelf: 'read' }
];

const BooksList = (props) => {
  const { books, onChangeBookShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map(bs => (
            <BookShelf
              key={bs.shelf}
              title={bs.title}
              books={books[bs.shelf]}
              onChangeBookShelf={onChangeBookShelf}
            />))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.object.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
}

export default BooksList;
