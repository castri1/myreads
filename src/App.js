import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    showSearchPage: false
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then(books => {
        const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const read = books.filter(book => book.shelf === 'read');

        this.setState({
          books: {
            currentlyReading,
            wantToRead,
            read
          }
        });
      });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  onChangeBookShelf = (book, event) => {
    const shelf = event.target.value;
    BooksAPI.update(book, shelf)
      .then(bookIds => this.getAllBooks());
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (<BooksList books={books} onChangeBookShelf={this.onChangeBookShelf} />)} />
        <Route exact path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
