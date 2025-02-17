import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Books from "../../Components/Booking";

const Main = () => {
  const [userEmail, setUserEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // Show button after 5 seconds

    return () => clearTimeout(timer); // Clean up timer
  }, []);
  //const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const challenges = [
    "is your daily milk production target?",
    "is your future plans for your cow's milk production?",
    "is your goal for the week regarding milk production?",
    "steps will you take to increase milk production today?",
    "What motivates you to improve milk production every day?",
    "Describe your plans for consistent milk production over the next month?",
  ];

  const randomChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setChallenge(challenges[randomIndex]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email) {
          setUserEmail(parsedUser.email);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
    const interval = setInterval(randomChallenge, 3000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const addBook = () => {
    navigate("/addbook");
  };

  return (
    <div style={{marginTop:'10px', textAlign: "center", padding: "20px" }}>
      {!userEmail ? (
        <div>
          <h2 style={{marginLeft:'-800px', marginTop:'20px',color:'rgba(255, 0, 0, 0.8)'
          }}>You have not logged-in⚠️</h2>
           <p style={{marginLeft:'800px',marginTop:'-40px'}}>{challenge}</p> 
          
          <p style={{  marginTop:'0px',marginBottom:'30px',height:'32px',width:'120px',marginLeft:'950px',border:'none',backgroundColor:'5px',cursor:'pointer',borderRadius:'10px',}} onClick={handleLoginRedirect}>Go to Login</p>
        </div>
      ) : (
        <div>
          <br/><br/><br/><br/><br/>
          {showButton && (<button style={{padding:'5px',marginLeft:'1100px',borderRadius:'5px',border:'none',height:'35px',width:'95px',backgroundColor:'#4CAF50',color:'white',cursor:'pointer'}} onClick={addBook}>Add Cow</button>)}
          <Books email={userEmail} />
        </div>
      )}
    </div>
  );
};

export default Main;
