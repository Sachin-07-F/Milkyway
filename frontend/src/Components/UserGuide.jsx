import React from "react";

const UserGuide = () => {
  const guideSteps = [
    { icon: "📝", title: "Sign Up", description: "Create an account to start tracking your cows." },
    { icon: "🔑", title: "Login", description: "Enter your credentials to access your dashboard." },
    { icon: "➕", title: "Add Cow", description: "Go to 'Add Cow' and fill in details to register a new cow." },
    { icon: "✏️", title: "Edit Cow", description: "Modify cow details from the Cow's." },
    { icon: "❌", title: "Delete Cow", description: "Remove a cow from your list if no longer needed." },
    { icon: "🆕", title: "Add Cow Data", description: "Add Daily, Monthly and Yearly Cow Data to analyse" },
    { icon: "📊", title: "See Cow Chart", description: "View milk yield statistics in various charts." },
    { icon: "⚠️", title: "want Support", description: "Contact MilkTrack Team from Contact_page." },
    { icon: "📩", title: "Get OTP", description: "get OTP for Secure Processing." },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📘 MilkTrack User Guide</h1>
      <p style={styles.subheading}>Learn how to use MilkTrack with simple steps.</p>

      <div style={styles.guideContainer}>
        {guideSteps.map((step, index) => (
          <div key={index} style={styles.stepCard}>
            <span style={styles.icon}>{step.icon}</span>
            <h2 style={styles.title}>{step.title}</h2>
            <p style={styles.description}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg, pink, #2a5298)", // Cool Blue Gradient
    color: "#fff",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "36px",
    marginTop: 60,
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "30px",
    fontStyle: "italic",
    opacity: 0.8,
  },
  guideContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  stepCard: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  stepCardHover: {
    transform: "scale(1.05)",
  },
  icon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    opacity: 0.9,
  },
};

export default UserGuide;
