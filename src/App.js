import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp;