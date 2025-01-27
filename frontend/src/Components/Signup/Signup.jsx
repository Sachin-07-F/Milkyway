import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

export default function Signup() {

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_Backend_Url}/auth/register`, {
        userName,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message || "Registration successful! Welcome email sent.", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(data.message || "Something went wrong!", {
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

  return (
    <div
      id="sec"
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 id="my-h2" className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <form id="myform" onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              id="username-label"
              htmlFor="username-id"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              name="userName"
              id="username-id"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              id="email-label"
              htmlFor="email-id"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email-id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              id="password-label"
              htmlFor="password-id"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password-id"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white transition duration-300 ${
              loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up...wait" : "Sign Up"}
          </button>
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
