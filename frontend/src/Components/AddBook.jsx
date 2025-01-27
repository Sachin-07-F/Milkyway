

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBook.css"; // Importing the CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [grade, setGrade] = useState("");
  const [production, setProduction] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_Backend_Url}/book/add`, {
        name,
        author,
        imageUrl,
        grade,
        production,
        description,
        email,
      });

      if (res.data.added) {
        toast.success("Book Added Successfully..", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/books"), 2000);
      } else {
        console.log(res);
        toast.error("Failed to Add Cow", {
          position: "top-center",
          autoClose: "3000",
        });
      }
    } catch (err) {
      console.error("Error while adding book:", err);
      toast.err("Error while adding the book. Check console for details.", {
        position: "top-center",
        autoClose: "3000",
      });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Cow</h2>
        <div className="form-group">
          <label htmlFor="book">Cow Name:</label>
          <input
            type="text"
            id="book"
            name="book"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Cow Age:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="production">Production:</label>
          <input
            type="text"
            id="production"
            name="production"
            value={production}
            onChange={(e) => setProduction(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
