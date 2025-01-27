import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [grade, setGrade] = useState("");
  const [production, setProduction] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_Backend_Url}/book/book/${id}`)
      .then((response) => {
        setName(response.data.name || "");
        setAuthor(response.data.author || "");
        setImageUrl(response.data.imageUrl || "");
        setGrade(response.data.grade || "");
        setProduction(response.data.production || "");
        setDescription(response.data.description || "");
      })
      .catch((err) => console.log("Error fetching book details:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_Backend_Url}/book/update/${id}`, {
        name,
        author,
        imageUrl,
        grade,
        production,
        description,
      });

      if (res.data.updated) {
        toast.success(`Cow: ${name} updated successfully!`,{
          position:'top-center',
          autoClose:'2000'
        });
        navigate("/books");
      } else {
        toast.error("Failed to update the Cow. Try again.",{
          position:'top-center',
          autoClose:'2000'
        });
      }
    } catch (err) {
      console.error("Error while updating book:", err);
      toast.err("Error while updating the book. Check console for details.",{
        position:'top-center',
        autoClose:'2000'
      });
    }
  };

  return (
    <div className="edit-book-container">
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input
            type="text"
            id="book"
            name='book'
            value={name}
            onChange={(e) => setName(e.target.value)}
            // placeholder="Enter book name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
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
            placeholder="Enter image URL"
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
            placeholder="Enter book grade"
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
            placeholder="Enter production"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="update-button">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;









