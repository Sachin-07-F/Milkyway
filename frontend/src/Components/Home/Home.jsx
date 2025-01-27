import React, { useEffect, useState } from "react";
import "./home.css";
import video from "../../Assest/cow_video.mp4";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state for shimmer effect
  const [goal, setGoal] = useState(""); // Goal state
  const [goalSet, setGoalSet] = useState(false); // Track if goal is set

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page on load
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 }); // Initialize AOS animations
  }, []);

  // Simulate loading for shimmer effect (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmitGoal = () => {
    setGoalSet(true);
  };

  return (
    <section className="home">
      {isLoading ? (
        <>
          {/* Shimmer Effect Placeholder for 1 Big Card */}
          <div className="skeleton-cards big-card">
            <div className="skeleton-thumbnail"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-description shorts"></div>
          </div>

          {/* Shimmer Effect Placeholder for 9 Small Cards */}
          <div className="skeleton-grid">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="skeleton-card small-card">
                  <div className="skeleton-thumbnail"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description short"></div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="overlay"></div>
          <video
            src={video}
            muted
            autoPlay
            loop
            type="video/mp4"
            style={{ width: "100%", height: "475px", objectFit: "cover" }}
          ></video>

          <div className="homeContent container">
            <div className="textDiv">
              <span data-aos="fade-up" className="smallText">
                Our Packages
              </span>
              <h1 data-aos="fade-up" className="homeTitle">
                Cow Yield Data Tracking
              </h1>
            </div>

            {/* Challenge Section */}
            <div data-aos="fade-up" style={{ display: "grid", justifyContent: "center" }}>
              {!goalSet ? (
                <div
                  style={{
                    width: "40%",
                    height: "350px",
                    textAlign: "center",
                    padding: "30px",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    backgroundColor: "#f4f4f9",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                  }}
                >
                  <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
                    Challenge: Set Your Goal!
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      marginBottom: "20px",
                    }}
                  >
                    Set a goal and track your cow's milk production each day. Can your cow exceed
                    your target?
                  </p>
                  <input
                    type="number"
                    value={goal}
                    onChange={handleGoalChange}
                    placeholder="Enter your target (mL)"
                    style={{
                      padding: "12px",
                      fontSize: "16px",
                      width: "80%",
                      marginBottom: "20px",
                      border: "2px solid #ddd",
                      borderRadius: "5px",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                    onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                  />
                  <button
                    onClick={handleSubmitGoal}
                    style={{
                      fontSize: "16px",
                      width: "60%",
                      height: "45px",
                      marginBottom: "25px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                  >
                    Submit Goal
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    width: "40%",
                    height: "250px",
                    textAlign: "center",
                    padding: "30px",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    backgroundColor: "#f4f4f9",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                  }}
                >
                  <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
                    Your Target: {goal} mL
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      marginBottom: "20px",
                    }}
                  >
                    Track your cow's production to see if it meets or exceeds your goal!
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
