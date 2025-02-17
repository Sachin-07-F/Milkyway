import React, { useState, useEffect } from "react";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFAQ(true);
    }, 3000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    { question: "➕ Where to Add cow?", answer: "Home or Cow's page." },
    { question: "🔄 Data not updating?", answer: "Try refreshing." },
    { question: "📞 Contact support?", answer: "Use contact page." },
    {
      question: "⚠️ Error while Creating Account?",
      answer: "Enter a valid email and Try.",
    },
    { question: "📩 OTP issue?", answer: "Check spam folder." },
    {
      question: "📘 Want User Guide?",
      answer: "Visit user guide (Detailed steps)",
    },
  ];

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
    setOpenIndex(null);
  };

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {showFAQ && (
        <>
          {/* Floating FAQ Button */}
          <button
            onClick={toggleFAQ}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #ff00ff, #ff6600)", // Pink-Orange Gradient
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 4px 15px rgba(255, 105, 180, 0.8)", // Soft Glow
              zIndex: 1000,
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.boxShadow = "0px 4px 20px rgba(255, 105, 180, 1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.boxShadow =
                "0px 4px 15px rgba(255, 105, 180, 0.8)")
            }
          >
            ?
          </button>

          {/* FAQ List with Space from Button */}
          <div
            style={{
              position: "fixed",
              bottom: isOpen ? "85px" : "-400px",
              right: "20px",
              width: "320px",
              background: "linear-gradient(135deg, #000428, #004e92)", // Dark Blue Gradient
              color: "white",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
              borderRadius: "15px",
              padding: "15px",
              zIndex: 999,
              transition: "bottom 0.4s ease-in-out, opacity 0.3s ease-in-out",
              opacity: isOpen ? 1 : 0,
              border: "1px solid gold",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#ffcc00",
                textShadow: "0px 0px 10px rgba(255, 204, 0, 0.8)",
              }}
            >
              💡 FAQ's
            </h3>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <button
                  onClick={() => toggleAnswer(index)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "linear-gradient(90deg, #ff0099, #ff6600)", // Vibrant Pink-Orange
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "6px",
                    transition:
                      "background 0.3s ease-in-out, transform 0.2s ease-in-out",
                    color: "#fff",
                    boxShadow: "0px 2px 10px rgba(255, 105, 180, 0.5)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  {faq.question}
                </button>
                <p
                  style={{
                    fontSize: "14px",
                    padding: "3px",
                    marginTop: "3px",
                    borderRadius: "6px",
                    backgroundColor:
                      openIndex === index ? "#0099ff" : "transparent",
                    color: openIndex === index ? "#fff" : "transparent",
                    maxHeight: openIndex === index ? "100px" : "0",
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s ease-in-out, color 0.3s ease-in-out, background 0.3s ease-in-out",
                    boxShadow:
                      openIndex === index
                        ? "0px 0px 10px rgba(0, 153, 255, 0.7)"
                        : "none",
                  }}
                >
                  {faq.answer}
                  {index === faqs.length - 1 && openIndex === index && (
                    <a
                      href="/user-guide"
                      style={{
                        color: "#ffcc00",
                        textDecoration: "underline",
                        display: "block",
                        marginTop: "5px",
                      }}
                    >
                      Click Here
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FAQ;
