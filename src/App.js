import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
// import Shelf from './components/Shelf';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import SearchBook from './components/SearchBook';
import Shelf from './components/Shelf';



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentlyReading:[],
    read:[],
    wantToRead: [],
    searchedBooks: []
    
  }
  //TODO: ADD COMPONENT DID MOUNT AND GET STATE OF BOOKS 
   componentDidMount() {
    BooksAPI.getAll().then(books => {  
      this.setState(()=>({
        books,
        
      }))
     })   
 
  }
  
  changeShelf = (book, shelf)=> {    
    

    BooksAPI.update(book, shelf).then(updateBooks => {
      this.setState((prevState)=>({
        books: prevState.books.filter((updatedBook)=> updatedBook.id !== book.id).concat({...book, shelf}),
      }));
    }) 
  }
  searchBook=(query=' ') => {    
    BooksAPI.search(query).then(searchedBooks =>{   
      searchedBooks.length > 0 && searchedBooks.map(book => {
        const booksOnShelf = this.state.books.find((b)=>b.id === book.id);
           return booksOnShelf ? book.shelf = booksOnShelf.shelf: book.shelf = "none"
     
    })
  
        this.setState(()=>({
          searchedBooks
        }))
        
        

    });
   }
   
     
     
  

  render() {  
    const { books, searchedBooks} = this.state; 
    const currentlyReading= books.filter(book => book.shelf === 'currentlyReading');
    const read = books.filter(book => book.shelf === 'read');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
 
    return (
      <BrowserRouter>
        <div className="app">       
              <div className="list-books">
                    <Route path="/search" render={()=>( searchedBooks &&
                      <SearchBook books={searchedBooks} searchBook={this.searchBook} changeShelf={this.changeShelf} shelfedBooks= {books} />
                    ) } />
                  <Route path="/" exact render ={()=>(
                      <>
                            <div className="list-books-title">
                              <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                  <Shelf books={currentlyReading} changeShelf={this.changeShelf} shelf={'Currently Reading'} />
                                  <Shelf books={wantToRead} changeShelf={this.changeShelf} shelf={'Want to Read'} />                  
                                  <Shelf books={read} changeShelf={this.changeShelf} shelf={'Read'} />
                                </div>
                                <div className="open-search">
                                  <Link to='search' books={books}> 
                                        <button>Add a book</button>
                                  </Link>                
                                  
                                </div>
                            </div>  
                      </>
                  )}/>
                
              </div>
         </div>
       
      </BrowserRouter>
    )
  }
}

export default BooksApp
