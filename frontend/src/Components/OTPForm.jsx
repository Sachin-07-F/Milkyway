import React, { useState, useEffect } from "react";
import axios from "axios";
import Books from "./Books";
import { Link, useNavigate } from "react-router-dom";


const extractFullNameFromEmail = (email) => {
  if (!email) return "User";
  const namePart = email.split("@")[0];
  const cleanName = namePart.replace(/\d+/g, "");
  const words = cleanName.split(/[\W_]+/);
  return words
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const OTPForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isSendingOtp, setIsSendingOtp] = useState(false); 

  useEffect(() => {
    const storedStep = localStorage.getItem("step");
    const storedEmail = localStorage.getItem("verifiedEmail");
    const storedFirstName = localStorage.getItem("firstName");
    if (storedStep) setStep(parseInt(storedStep, 10));
    if (storedEmail) setVerifiedEmail(storedEmail);
    if (storedFirstName) setFirstName(storedFirstName);
  }, []);

  useEffect(() => {
    localStorage.setItem("step", step);
    localStorage.setItem("verifiedEmail", verifiedEmail);
    localStorage.setItem("firstName", firstName);
  }, [step, verifiedEmail, firstName]);

  useEffect(() => {
    let interval;
    if (step === 2) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const sendOtp = async () => {
    setIsSendingOtp(true);
    try {
      // setMessage("");
      setMessage('');
      setError("");
      const response = await axios.post(
        `${process.env.REACT_APP_Backend_Url}/api/otp/send-otp`,
        { email }
      );
      setMessage(response.data.message);
      setTimer(300); // Reset timer to 5 minutes
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP. Try again.");
    } finally{
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setMessage("");
      setError("");
      const response = await axios.post(
        `${process.env.REACT_APP_Backend_Url}/api/otp/verify-otp`,
        { email, otp }
      );
      setMessage(response.data.message);
      const name = extractFullNameFromEmail(email);
      setFirstName(name);
      setVerifiedEmail(email);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to verify OTP. Try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setStep(1);
    setMessage("");
    setError("");
    setVerifiedEmail("");
    setFirstName("");
    setTimer(300); // Reset timer
    localStorage.clear();
    navigate("/");
  
  };

  const editName = () => {
    const newName = prompt("Enter your correct name:", firstName);
    if (newName) {
      setFirstName(newName.trim());
    }
  };

  const navigate = useNavigate();
  const addCow = () => {
    navigate("/addbook");
  };

  return (
    
    <div
      style={{
         maxWidth: step === 3 ? "100%" : "463px",
         
         margin: "0 auto",
        paddingTop: step === 3 ? "70px" : "320px",
         padding: "20px",
         border: "1px solid #ccc",
         borderRadius: step === 3 ? "0px" : "8px",
         marginBottom: step === 3 ? '0px':'40px',
         alignItems:'center',
         justifyContent:'center',
      }}
    >
      {step === 1 && (
        <>
          
          <div style={{height:'120px',width:'100%'}}></div>
          <h2>Enter Email to See Cow's</h2>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={sendOtp}
            disabled={isSendingOtp}
            style={{
              padding: "10px 20px",
              backgroundColor:  isSendingOtp ? "#ccc" :"#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor:isSendingOtp ? "not-allowed" : "pointer",
            }}
          >
             {isSendingOtp ? "Wait..." : "Send OTP"}
          </button>
         
        </>
      )}

      {step === 2 && (
        <>
          <div style={{height:'120px',width:'100%'}}></div>
          <h2>Verify OTP</h2>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>Time remaining: {formatTime(timer)}</p>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={verifyOtp}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Verify OTP
          </button>
          <button
            onClick={sendOtp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffc107",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Resend OTP
          </button>
          {timer === 0 && (
            <p style={{ color: "red" }}>
              OTP has expired. Please resend the OTP.
            </p>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h1 style={{ marginBottom: "20px", color: "#4169e1" }}>
              Welcome {firstName} 😊
            </h1>
            <p>
              This page contains all the Cows. You can{" "}
              <strong>add, edit and delete cows</strong>
              <strong
                onClick={addCow}
                style={{
                  color: "rgb(11, 110, 3)",
                  padding: "7px 14px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              >
                ADD
              </strong>
            </p>
          </div>

          <Books email={verifiedEmail} />

          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "rgb(32, 191, 110)",
                marginLeft: "20px",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={editName}
            >
              Edit Name
            </button>
          </div>
        </>
      )}
      
      
    </div>

  );
};

export default OTPForm;












