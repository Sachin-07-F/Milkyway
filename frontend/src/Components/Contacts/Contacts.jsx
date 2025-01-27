import React, { useEffect, useState } from "react";
import "./contacts.css";
import Swal from "sweetalert2";

const Contacts = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);

  // Fetch user details from localStorage and autofill fields
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        // Ensure keys exist before setting state
        setEmail(user.email || "");
        setName(user.userName || ""); // Use `userName` (as per your backend response)
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "c72ca227-c327-43a6-a663-de50ff9af0b9");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message Sent Successfully!",
        icon: "success",
      });
    }
  };

  return (
    <section className="contact">
      <form onSubmit={onSubmit}>
        <h2>Contact Form</h2>

        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <label>Your Message</label>
          <textarea
            name="message"
            className="field mess"
            placeholder="Enter Your Message"
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contacts;










