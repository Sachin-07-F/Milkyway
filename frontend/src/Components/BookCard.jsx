
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosImages } from "react-icons/io";
//import './Books.css';  // Importing the style for the BookCard component

const BookCard = ({ book }) => {
    const { name, author, imageUrl, grade, production, description } = book;
    return (
        <div className='book-card'>
            <img src={imageUrl} alt={name} className='book-image' />
            <div className="book-details">
                <h3 className="book-name">{name}</h3>
                <p className="book-author"><IoIosImages /><strong>Age:</strong> {author}</p>
                <div className="fees">
                    <div className="grade"><small>Grade: {grade}</small></div>
                    <div className="price"><h5>prod: {production}ML</h5></div>
                </div>
                <p className="book-description">{description}</p>
            </div>
            <div className="book-actions">
                <button className="btn-action"><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
                <button className="btn-action"><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
            </div>
        </div>
    );
};

export default BookCard;
