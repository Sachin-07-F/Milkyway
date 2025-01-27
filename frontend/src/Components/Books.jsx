import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "./Books.css";

const DummyCards = () => {
  return (
    <div className="dummy-grid">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="dummy-card">
          <div className="dummy-image"></div>
          <div className="dummy-details">
            <div className="dummy-title"></div>
            <div className="dummy-description"></div>
            <div className="dummy-description"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Books = ({ email }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (email) {
      axios
        .get(`${process.env.REACT_APP_Backend_Url}/book/search?query=${email}`)
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [email]);

  return (
    <div className="book-container">
      {/* Videohi section */}
      {/* Videohi section */}
      

      {books.length > 0 ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <DummyCards />
        
      )}
    </div>
  );
};

// Styling
const style = document.createElement("style");
style.textContent = `
  .book-container {
    padding: 20px;
  }

  .video-section {
    margin-bottom: 20px;
  }

  .book-grid,
  .dummy-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Ensures 3 cards per row */
    gap: 20px;
  }

  .dummy-card {
    width: 100%;
    height: 300px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.5s ease-in-out;
  }

  .dummy-image {
    width: 100%;
    height: 150px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f9f9f9 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .dummy-details {
    padding: 15px;
  }

  .dummy-title,
  .dummy-description {
    height: 15px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f9f9f9 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .dummy-title {
    width: 70%;
  }

  .dummy-description {
    width: 90%;
  }

  /* Animations */
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

document.head.appendChild(style);

export default Books;
