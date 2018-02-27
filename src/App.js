import React from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import SearchBooks from './SearchBooks';
import BooksList from './BooksList';
import Loading from './Loading';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    booksResult: [],
    pendingRequest: false
  }

  componentWillMount() {
    this.getAllBooks();
  }

  pushBooksToState(books) {
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
  }

  getAllBooks() {
    this.makeRequest(() => BooksAPI.getAll())
      .then(books => this.pushBooksToState(books));
  }

  resetBooksResult = () => {
    this.setState({ booksResult: [] });
  }

  onChangeBookShelf = (book, event) => {
    const shelf = event.target.value;
    this.makeRequest(() => BooksAPI.update(book, shelf))
      .then(bookIds => {
        const { currentlyReading, wantToRead, read } = this.state.books;
        const allBooks = [...currentlyReading, ...wantToRead, ...read];
        const bookInShelf = allBooks.find(b => b.id === book.id);
        if (bookInShelf) {
          bookInShelf.shelf = shelf;
        } else {
          book.shelf = shelf;
          allBooks.push(book);
        }
        this.pushBooksToState(allBooks);
      });
  }

  onChangeSearchQuery = (query) => {
    if (query.length > 0) {
      this.makeRequest(() => BooksAPI.search(query))
        .then(books => {
          if (books.error) {
            this.mergeBooks([]);
            return;
          }
          this.mergeBooks(books);
        });
    } else {
      this.resetBooksResult();
    }
  }

  mergeBooks(books) {
    if (books.length === 0) {
      this.setState({
        booksResult: []
      });
      return;
    }

    const booksResultsIds = books.map(book => book.id);
    const { currentlyReading, wantToRead, read } = this.state.books;
    const allBooks = [...currentlyReading, ...wantToRead, ...read];
    const inShelfBooks = allBooks.filter(book => booksResultsIds.indexOf(book.id) >= 0);
    const inShelfBooksIds = inShelfBooks.map(book => book.id);
    books = books.filter(book => inShelfBooksIds.indexOf(book.id) < 0);

    this.setState({
      booksResult: [...inShelfBooks, ...books].sort(sortBy('title'))
    });
  }

  togglePendingRequest(value) {
    this.setState({ pendingRequest: value });
  }

  makeRequest(fn) {
    this.togglePendingRequest(true);
    return fn()
      .then(result => {
        this.togglePendingRequest(false);
        return result;
      })
      .catch(err => {
        this.togglePendingRequest(false);
        console.log(err);
      });
  }

  render() {
    const { books, booksResult, pendingRequest } = this.state;
    return (
      <div className="app">
        <Loading pendingRequest={pendingRequest} />
        <Route exact path="/" render={() => (<BooksList books={books} onChangeBookShelf={this.onChangeBookShelf} />)} />

        <Route exact path="/search" render={() =>
          (<SearchBooks
            books={booksResult}
            onChangeBookShelf={this.onChangeBookShelf}
            onChangeSearchQuery={this.onChangeSearchQuery}
            resetBooksResult={this.resetBooksResult}
            pendingRequest={pendingRequest}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp;
