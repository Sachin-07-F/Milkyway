import React,{useEffect} from 'react';
import './about.css';
import { GiCow, GiMilkCarton, GiFarmTractor } from 'react-icons/gi';


const About = () => {
 
  useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page
    }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">About MilkTrack</h1>
        <p className="about-description">
          Welcome to <span>MilkTrack</span>, the ultimate solution for dairy farmers and milk producers to streamline their milk production tracking. Our goal is to empower farmers and businesses with accurate, real-time data to manage daily yield, track production trends, and optimize earnings without focusing on sales.
        </p>

        <div className="about-features">
          <div className="feature-card">
            <GiCow className="feature-icon" />
            <h3>Track Dairy Yield</h3>
            <p>Monitor daily milk production for cows and buffaloes, ensuring a healthier, more productive herd.</p>
          </div>

          <div className="feature-card">
            <GiMilkCarton className="feature-icon" />
            <h3>Analyze Trends</h3>
            <p>Get insights into production trends to optimize your farm's performance and efficiency over time.</p>
          </div>

          <div className="feature-card">
            <GiFarmTractor className="feature-icon" />
            <h3>Boost Productivity</h3>
            <p>Use data to enhance overall productivity, improve herd health, and maximize earnings.</p>
          </div>
        </div>

        <div className="about-values">
          <h2>Why Choose MilkTrack?</h2>
          <p>
            At MilkTrack, we believe in innovation and simplicity. Our platform is designed to make milk production tracking effortless, allowing you to focus on what truly matters — your farm and livestock. Here’s why farmers trust us:
          </p>
          <ul>
            <li>💡 Simple and user-friendly interface.</li>
            <li>📊 Accurate tracking of milk yield in milliliters.</li>
            <li>📈 Insights into herd performance and productivity.</li>
            <li>🌱 Commitment to empowering dairy farmers.</li>
          </ul>
        </div>
      </div>

      
    </section>
  );
};

export default About;
