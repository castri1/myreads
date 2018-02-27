import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
    onChangeSearchQuery: PropTypes.func.isRequired,
    resetBooksResult: PropTypes.func.isRequired,
    pendingRequest: PropTypes.bool.isRequired
  }

  state = {
    query: ''
  }

  componentWillUnmount() {
    this.props.resetBooksResult();
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.props.onChangeSearchQuery(query);
  }

  render() {
    const { books, onChangeBookShelf, pendingRequest } = this.props;
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={e => this.updateQuery(e.target.value)} type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          {books.length > 0 && (
            <ol className="books-grid">
              {books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeBookShelf={onChangeBookShelf.bind({}, book)}
                />))}
            </ol>)
          }
          {(books.length === 0 && query.length > 0 && !pendingRequest) && (
            <p>No books found matching: <strong>{query}</strong></p>
          )}
        </div>
      </div>
    );
  }
};

export default SearchBooks;
