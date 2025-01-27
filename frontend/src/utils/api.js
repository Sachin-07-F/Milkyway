import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.Frontend_Url}/dashboard`, // Replace with your backend API URL
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle expired token
      toast.error("Session expired. Please log in again.", {
        position: "top-center",
        autoClose: 3000,
      });
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user');
      alert('Session expired. Please log in again.');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
// //above v-1





