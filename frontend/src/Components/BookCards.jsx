import React from "react";
import { Link } from "react-router-dom";

const BookCards = ({ book }) => {
  const { name, author, imageUrl, grade, production, description, _id } = book;

  return (
    <div className="book-card">
      <img src={imageUrl} alt={name} className="book-image" />
      <div className="book-details">
        <h3 className="book-name">{name}</h3>
        <p className="book-author"><strong>Age:</strong> {author}</p>
        <div className="fees">
          <div className="grade"><small>Grade: {grade}</small></div>
          <div className="price"><h5>Prod: {production}ML</h5></div>
        </div>
        <p className="book-description">{description}</p>
      </div>
      <div className="book-actions">
        <Link to={`/details/${book._id}`} className="btn-link">
          <button className="btn-action">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default BookCards;






