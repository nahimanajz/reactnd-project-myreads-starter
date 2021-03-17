import React from 'react';
import { Link } from 'react-router-dom';

class SearchBook  extends React.Component{
    
    
     getQuery = (query) => {  
         this.props.searchBook(query?query: ' ');
    }
    
    render(){
        const {books} = this.props;
        
       

    return(
        <div className="search-books">
            <div className="search-books-bar">            
            <Link to='/'>
                 <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
                
                <input type="text" 
                     placeholder="Search by title or author" 
                     onChange={(e)=> this.getQuery(e.target.value)}  />

            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
               { books.length >0 && books.map(book => book.imageLinks && (
                   
                   <li key={book.id}>
                   <div className="book">
                   <div className="book-top">
                       
                   <div className="book-cover"                           
                     style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                       <div className="book-shelf-changer">
                           {/* TODO: check the book if is assigned on anyshelf below
                             By using book filter is should be great
                             set <option selected> on the books which are selected
                           */}
                       <select onChange={(e)=>this.props.changeShelf(book,e.target.value)}>
                       {                        
                          book.shelf === 'currentlyReading' ? ( 
                          <option value="currentlyReading" selected>Currently Reading</option> 
                          ):(<option value="currentlyReading">Currently Reading</option>)
                          }
                          { 
                            book.shelf === 'wantToRead' ? ( 
                            <option value="wantToRead" selected> Want to Read</option> ):(
                            <option value="wantToRead"> Want to Read</option>
                            )                         
                          }
                          { 
                            book.shelf === 'read' ?( 
                            <option value="read" selected>Read</option>
                             ):(
                                <option value="read">Read</option>
                            )
                          }
                          { 
                             book.shelf === 'none' ? (
                                <option value="none" selected>None</option>
                                ):(
                                 <option value="none">None</option>
                                )
                          }
                       </select>
                       </div>
                   </div>
                   <div className="book-title">{book.title}</div>
                   <div className="book-authors">{book.authors}</div>
                   </div>
                </li>
               ))}
            </ol>
            </div>
        </div>
    )
    }
    
}
export default SearchBook;
