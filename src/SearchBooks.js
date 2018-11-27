import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired,
    bookshelf: PropTypes.array
  };

  state = {
    query: '',
    searchedBooks: []
  };

  onChangeQuery = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({
        query: query,
        searchedBooks: books
      });
    });
  };

  render() {
    console.log(this.props.bookshelf);

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
              <button className='close-search' >Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onKeyUp={e => {
                if (e.keyCode === 13 || !e.target.value)
                  this.onChangeQuery(e.target.value);
              }}
            />
          </div>
          <span className='inst-ent-to-search'>Press "ENTER" to search</span>
        </div>
        {
          this.state.query && this.state.searchedBooks.map ? (
          <div className='search-books-results'>
            <ol className='books-grid'>
              {
                 this.state.searchedBooks.map(book => (
                  <li key={book.id}>
                    <div className='book'>
                      <div className='book-top'>
                        <div
                          className='book-cover'
                          style={
                            {
                              width: 128,
                              height: 193,
                              backgroundImage: book.imageLinks && book.imageLinks.thumbnail ? `url('${book.imageLinks.thumbnail}')` : 'none'
                            }
                          }
                        />
                        <div className='book-shelf-changer'>
                          <select
                            value={this.props.bookshelf &&
                              this.props.bookshelf.find(ele => ele.id === book.id)
                              ? this.props.bookshelf.find(ele => ele.id === book.id).shelf
                              : 'none'}
                            onChange={e => this.props.onChangeBookshelf(book, e.target.value)} >
                            <option value='move' disabled>Move to...</option>
                            <option value='currentlyReading'>Currently Reading</option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                          </select>
                        </div>
                      </div>
                      <div className='book-title'>{book.title ? book.title : 'Unknown'}</div>
                      <div className='book-authors'>{book.authors ? book.authors.join() : 'Unknown'}</div>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>) : (
            <div className='no-books-search'>No books!</div>
          )
        }
      </div>
    );
  }
}

export default SearchBooks;