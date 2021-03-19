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
                           
                       <select onChange={(e)=>this.props.changeShelf(book,e.target.value)} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                       
                      
                          <option value="currentlyReading">Currently Reading</option>
                         
                            <option value="wantToRead"> Want to Read</option>                         
                            <option value="read">Read</option>                      
                            <option value="none">None</option>
                       
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
