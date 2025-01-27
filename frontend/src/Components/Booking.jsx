import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCards from "./BookCards";
import "./Books.css";

const Booking = ({ email }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      setLoading(true);
      setError("");
      axios
        .get(`${process.env.REACT_APP_Backend_Url}/book/search?query=${email}`)
        .then((res) => {
          setBooks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch books. Please try again later.");
          console.error("Error fetching books:", err);
          setLoading(false);
        });
    }
  }, [email]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="book-container">
      {books.length > 0 ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCards key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="no-books">No books found for the provided email.</p>
      )}
    </div>
  );
};

export default Booking;








