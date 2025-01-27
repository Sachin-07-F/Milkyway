import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_Backend_Url}/auth/login`, formData);

      if (data.success) {
        // Save the token and user object in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success toast message
        toast.success("Login Successful..", {
          position: "top-center",
          autoClose: 3000,
        });

        // Redirect to the dashboard after a short delay
        setTimeout(() => navigate("/"), 2000);
      } else {
        // Show error toast if the response is unsuccessful
        toast.error(data.message || "Login failed!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data using the token
  const userAuthentication = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${process.env.REACT_APP_Backend_Url}/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Set the user data
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <div id="main-divs" className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 id="myh2-s" className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <form id="myforms" onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label id="email-label" htmlFor="emails" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="emails"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label id="password-label" htmlFor="passwords" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="passwords"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white transition duration-300 ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
