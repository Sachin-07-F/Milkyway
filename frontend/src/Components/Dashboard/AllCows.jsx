import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChartComponent from './ChartComponent';

const AllCows = ({ authToken }) => {
  const [cows, setCows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_Backend_Url}/api/cows`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCows(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCows();
  }, [authToken]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_Backend_Url}/api/cows/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCows((prevCows) => prevCows.filter((cow) => cow._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="all-cows-container">
      <h2>All Cows</h2>
      <button onClick={() => navigate('/add-cow')}>Add New Cow</button>
      <div className="cow-list">
        {cows.map((cow) => (
          <div key={cow._id} className="cow-card">
            <h3>{cow.name}</h3>
            <img src={cow.image} alt={cow.name} />
            <p>{cow.description}</p>
            <button onClick={() => navigate(`/edit-cow/${cow._id}`)}>Edit</button>
            <button onClick={() => handleDelete(cow._id)}>Delete</button>
            <ChartComponent dailyYield={cow.dailyYield} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCows;
