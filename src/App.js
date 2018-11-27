import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {

  //As soon as the component loads, load all the books from bookshelf
  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  };

  //If book exists in the bookshelf, just its shelf changes.
  //Otherwise, it is added to the bookshelf.
  onChangeBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const foundBook = this.state.books.find(ele => ele.id === book.id);
      if (foundBook)
        foundBook.shelf = shelf;
      else {
        book.shelf = shelf;
        console.log(book);
        this.state.books.push(book);
      }
      this.setState(this.state);
    });
  };

  //State of this component is determined by the books
  state = {
    books: []
  };

  render() {
    return (
      <div className='app'>
        {/* On the main page, show the bookshelf */}
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookshelf={this.onChangeBookshelf}
          />
        )} />
        {/* On the search page, show the search component */}
        <Route path='/search' render={() => (
          <SearchBooks
            bookshelf= {this.state.books}
            onChangeBookshelf={this.onChangeBookshelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;