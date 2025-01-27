import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AddCow = ({ fetchCows }) => {
  const [name, setName] = useState('');
  const { auth } = useAuth();

  const handleAddCow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cows',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCows();
      setName('');
    } catch (err) {
      console.error('Error adding cow:', err.response?.data?.message);
    }
  };

  if (!auth.user) {
    return null;
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Cow Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddCow}>Add Cow</button>
    </div>
  );
};

export default AddCow;
