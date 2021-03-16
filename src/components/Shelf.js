import React from 'react';
import { Book } from './Book';
export default function Shelf(props) {
    const { books, shelf } = props;

    return (                 
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
            <Book books={books} changeShelf={props.changeShelf}/>
          
        </div>
      </div>
                

    )
}