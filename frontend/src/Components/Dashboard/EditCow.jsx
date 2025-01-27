import React, { useState } from 'react';
import axios from 'axios';

const EditCow = ({ cow, fetchCows }) => {
  const [name, setName] = useState(cow.name);
  const [image, setImage] = useState(cow.image);
  const [grade, setGrade] = useState(cow.grade);
  const [description, setDescription] = useState(cow.description);
  const [production, setProduction] = useState(cow.production);
  const [age, setAge] = useState(cow.age);
  const [error, setError] = useState('');

  const handleEditCow = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/cows/${cow._id}`,
        { name, image, grade, description, production, age },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCows(); // Refresh cow list after editing
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cow');
    }
  };

  return (
    <div className="editCowForm">
      <h2>Edit Cow</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleEditCow}>
        <input type="text" placeholder="Cow Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Daily Production (ML)" value={production} onChange={(e) => setProduction(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCow;
