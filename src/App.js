import React from 'react'
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    showSearchPage: false
  }
  bookShelves = [
    { title: 'Currently Reading', shelf: 'currentlyReading' },
    { title: 'Want to Read', shelf: 'wantToRead' },
    { title: 'Read', shelf: 'read' }
  ]

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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.bookShelves.map(bs => (
                    <BookShelf 
                      title={bs.title} 
                      books={books[bs.shelf]} 
                      onChangeBookShelf={this.onChangeBookShelf} 
                    />))}
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
