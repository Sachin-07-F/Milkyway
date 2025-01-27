import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
