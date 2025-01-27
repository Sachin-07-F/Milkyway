import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [newCowData, setNewCowData] = useState({
    name: "",
    breed: "",
    age: "",
    milkYield: "",
    imageUrl: "", // for storing the cow image URL
  });

  const [cows, setCows] = useState([]); // State to hold list of cows

  useEffect(() => {
    // Fetch all cows when component mounts
    const fetchCows = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_Backend_Url}/dashboard/cows`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCows(response.data); // Set cows from the API response
      } catch (error) {
        console.error("Error fetching cows:", error);
      }
    };

    fetchCows();
  }, []);

  const handleChange = (e) => {
    setNewCowData({
      ...newCowData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCow = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_Backend_Url}/dashboard/cows/add`,
        newCowData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Cow added successfully:", response.data);
      setCows([...cows, response.data]); // Add new cow to the state
    } catch (error) {
      console.error("Error adding cow:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCow(); // Call handleAddCow when form is submitted
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newCowData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={newCowData.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={newCowData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Milk Yield (in liters):</label>
          <input
            type="text"
            name="milkYield"
            value={newCowData.milkYield}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={newCowData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Cow</button>
      </form>

      {/* Displaying the cows in card format */}
      <div className="cow-cards">
        {cows.map((cow) => (
          <div className="cow-card" key={cow._id}>
            <img src={cow.imageUrl} alt={cow.name} className="cow-image" />
            <div className="cow-info">
              <h3>{cow.name}</h3>
              <p>Breed: {cow.breed}</p>
              <p>Age: {cow.age}</p>
              <p>Milk Yield: {cow.milkYield} liters</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
