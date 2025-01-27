import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { GiCow } from "react-icons/gi";
import { toast } from 'react-toastify'; 

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || "User");
    }
  }, []);

  // Handle toggling of the navbar
  const toggleNavbar = () => {
    setActive(!active);
  };

  // Handle logout functionality
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent form submission behavior

    // Clear all user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    // Update state and navigate to the home page
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    toast.success('Logged out...Bye', { position: 'top-center' });
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo">
            <h1>
              <GiCow className="icon" />
              MilkTrack.
            </h1>
          </Link>
        </div>

        <div className={`navBar ${active ? "activeNavbar" : ""}`}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/cows" className="navLink">
                Cow's
              </Link>
            </li>
            <li className="navItem">
              <Link to="/about" className="navLink">
                About
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                Contact
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="navItem">
                  <Link to="/signup" className="navLink">
                    Sign Up
                  </Link>
                </li>
                <li className="navItem">
                  <Link to="/login" className="navLink">
                    Log In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navItem">
                  <Link to="/profile" className="navLink">
                     Profile
                  </Link>
                </li>
                <li className="navItem">
                  
                    <button type="submit" className="btn logout-btn" onClick={handleLogout}>
                      Log Out
                    </button>
                 
                </li>
              </>
            )}
          </ul>
        </div>

        <div onClick={toggleNavbar} className="toggleNavbar">
          <span className={`bar ${active ? "activeBar" : ""}`}></span>
          <span className={`bar ${active ? "activeBar" : ""}`}></span>
          <span className={`bar ${active ? "activeBar" : ""}`}></span>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
