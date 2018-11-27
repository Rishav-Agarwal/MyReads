import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  };

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

  state = {
    books: []
  };

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookshelf={this.onChangeBookshelf}
          />
        )} />
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