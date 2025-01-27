import React, { useState, useEffect } from "react";
import api from "../../utils/api"; // Axios instance
import CowCard from "../CowCard/CowCard"; // CowCard Component

import axios from "axios";
// import "./dashboard.css"; // Styling for the Dashboard

const Dashboard = () => {
  const [cows, setCows] = useState([]);
  const [newCow, setNewCow] = useState({
    image: "",
    name: "",
    age: "",
    grade: "",
    production: "",
    description: "",
  });

  // Fetch all cows for the logged-in user
 

  // Handle input changes for the new cow form
  const handleInputChange = (e) => {
    setNewCow({ ...newCow, [e.target.name]: e.target.value });
  };

  // Handle adding a new cow
  const handleAddCow = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/cows/add", newCow);
      setCows([...cows, data.cow]); // Add the new cow to the list
      setNewCow({ image: "", name: "", age: "", grade: "", production: "", description: "" }); // Clear form
    } catch (error) {
      console.error("Error adding cow:", error);
    }
  };

  // Handle updating an existing cow
  const handleUpdateCow = async (cow) => {
    const updatedName = prompt("Enter new name for the cow:", cow.name);
    if (!updatedName) return;

    try {
      const { data } = await api.put(`/cows/update/${cow._id}`, { ...cow, name: updatedName });
      setCows(cows.map((c) => (c._id === cow._id ? data.cow : c))); // Update cow in the list
    } catch (error) {
      console.error("Error updating cow:", error);
    }
  };

  // Handle deleting a cow
  const handleDeleteCow = async (id) => {
    try {
      await api.delete(`/cows/delete/${id}`);
      setCows(cows.filter((cow) => cow._id !== id)); // Remove the cow from the list
    } catch (error) {
      console.error("Error deleting cow:", error);
    }
  };

  const fetchCows = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_Backend_Url}/api/cows/create`, {
        name: "Cow Name",
        email: "example@example.com",
        mobile: "1234567890",
        // You need to handle image upload here if applicable
      });
      console.log("Cow added:", response.data);
    } catch (error) {
      console.error("Error fetching cows:", error);
    }
  };
  
  fetchCows();

  // Fetch cows on component mount
  useEffect(() => {
    fetchCows();
  }, []);

  return (
    // <div className="dashboard">
    //   <h1>My Cows</h1>
    //   {/* <form onSubmit={handleAddCow} className="add-cow-form">
    //     <input type="text" name="image" placeholder="Image URL" value={newCow.image} onChange={handleInputChange} required />
    //     <input type="text" name="name" placeholder="Name" value={newCow.name} onChange={handleInputChange} required />
    //     <input type="number" name="age" placeholder="Age" value={newCow.age} onChange={handleInputChange} required />
    //     <input type="text" name="grade" placeholder="Grade" value={newCow.grade} onChange={handleInputChange} required />
    //     <input type="number" name="production" placeholder="Production (ml)" value={newCow.production} onChange={handleInputChange} required />
    //     <textarea name="description" placeholder="Description" value={newCow.description} onChange={handleInputChange} />
    //     <button type="submit">Add Cow</button>
    //   </form> */}
    //   <div className="cow-list">
    //     {cows.map((cow) => (
    //       <CowCard key={cow._id} cow={cow} onUpdate={handleUpdateCow} onDelete={handleDeleteCow} />
    //     ))}
    //   </div>
    // </div>
    <h1>Hello ,From Dashboard</h1>
)
};

export default Dashboard;







