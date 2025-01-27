import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user details from localStorage after login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.userName || "User");
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // Handle navigation when Explore button is clicked
  const handleExploreClick = () => {
    window.location.href = "/"; // Navigate to the home page
  };

  // Handle navigation when Contact Support button is clicked
  const handleContactClick = () => {
    window.location.href = "/contact"; // Navigate to the Contact page
  };

  return (
    <div className="profile-container" id='pr'>
      <div className="profile-card">
        <img 
          src="https://th.bing.com/th/id/OIP.JmMkZ_mIPAUTCCvuPfshBQHaHa?w=200&h=193&c=7&r=0&o=5&dpr=1.5&pid=1.7" 
          alt="Profile" 
          className="profile-image" 
        />
        <h2>Welcome, {userName.charAt(0).toUpperCase() + userName.slice(1)}!</h2>

        <div className="intro-section">
          <p>
            Thank you for being a part of our MilkTrack community! Here, we aim to provide easy access to 
            tracking your cow and buffalo milk production. It's more than just tracking; it’s a journey towards 
            better milk management and profits.
          </p>
        </div>

        <div className="explore-section">
          <h3>Explore MilkTrack:</h3>
          <p>Manage your cows’ daily milk yields, track your earnings, and keep an eye on your farm's performance in real time!</p>
          <button className="explore-button" onClick={handleExploreClick}>Start Exploring</button>
        </div>

        <div className="additional-info">
          <h3>Your Dashboard:</h3>
          <ul>
            <li>View and edit cow information</li>
            <li>Track daily milk yield and earnings</li>
            <li>Set up notifications for important updates</li>
            <li>Monitor your farm’s progress over time</li>
          </ul>
        </div>

        <div className="support-section">
          <h3>Need Help?</h3>
          <p>If you have any questions, feel free to reach out to us at any time!</p>
          <button className="support-button" onClick={handleContactClick}>Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
