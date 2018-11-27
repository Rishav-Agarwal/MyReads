import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  };

  render() {
    const bookshelves = [
      {
        name: 'Currently reading',
        id: 'currentlyReading',
        books: this.props.books.filter(book => book.shelf === 'currentlyReading')
      },
      {
        name: 'Want to read',
        id: 'wantToRead',
        books: this.props.books.filter(book => book.shelf === 'wantToRead')
      },
      {
        name: 'Read',
        id: 'read',
        books: this.props.books.filter(book => book.shelf === 'read')
      }
    ];
    
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {
              bookshelves.map(bookshelf => (
                <div className='bookshelf' key={bookshelf.id}>
                  <h2 className='bookshelf-title'>{bookshelf.name}</h2>
                  <div className='bookshelf-books'>
                    <ol className='books-grid'>
                      {
                        bookshelf.books.length ? (bookshelf.books.map(book => (
                          <li key={book.id}>
                            <div className='book'>
                              <div className='book-top'>
                                <div
                                  className='book-cover'
                                  style={
                                    {
                                      width: 128,
                                      height: 193,
                                      backgroundImage: book.imageLinks.thumbnail ? `url('${book.imageLinks.thumbnail}')` : 'white'
                                    }
                                  }
                                />
                                <div className='book-shelf-changer'>
                                  <select value={book.shelf} onChange={e => this.props.onChangeBookshelf(book, e.target.value)}>
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
                        ))) : (
                          <div className='no-books'>No books!</div>
                        )
                      }
                    </ol>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>
              <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;