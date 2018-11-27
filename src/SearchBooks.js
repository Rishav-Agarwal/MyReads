import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  //Properties
  static propTypes = {
    //Function which is called when a book os added to the bookshelf
    onChangeBookshelf: PropTypes.func.isRequired,
    //The bookshelf itself
    bookshelf: PropTypes.array
  };

  //State is determined by query and the searched books being shown
  state = {
    query: '',
    searchedBooks: []
  };

  //This function is called when query is changed and either 'Enter' is pressed or query becomes empty
  onChangeQuery = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({
        query: query,
        searchedBooks: books
      });
    });
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
        {/* Back to main page */}
          <Link to='/'>
              <button className='close-search' >Close</button>
          </Link>
          {/* Query input */}
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
          {/* Ask user to press 'enter' to search */}
          <span className='inst-ent-to-search'>Press "ENTER" to search</span>
        </div>
        {
          //If query is valid and search results are not empty show the result
          this.state.query && this.state.searchedBooks.map ? (
          <div className='search-books-results'>
            <ol className='books-grid'>
              {
                //Loop over the searched books and return their views
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
            //If query is empty or no results show up, show 'No books!'
            <div className='no-books-search'>No books!</div>
          )
        }
      </div>
    );
  }
}

export default SearchBooks;