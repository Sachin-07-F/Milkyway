import React from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './cowDetails.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CowDetails = ({ data }) => {
  const { id } = useParams();
  const cow = data.find((cow) => cow.id.toString() === id);

  if (!cow) {
    return (
      <div>
        <Navbar />
        <div className="notFound">
          <h2>Cow not found!</h2>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock data for weekly and monthly production
  const weeklyProduction = [800, 750, 820, 810, 780, 790, 800];
  const monthlyProduction = [23000, 24500, 23500, 24000, 23800, 25000, 24200, 23900];

  const weeklyData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Weekly Production (ML)',
        data: weeklyProduction,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Monthly Production (ML)',
        data: monthlyProduction,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#36A2EB',
          '#FF6384',
        ],
        hoverBackgroundColor: '#FFD700',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#444',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        footerFont: { size: 12 },
        borderColor: '#FFCE56',
        borderWidth: 2,
        cornerRadius: 5,
      },
      title: {
        display: true,
        text: 'Milk Production Insights',
        font: {
          size: 18,
        },
        color: '#444',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#555',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="cowDetails">
        <div className="cowCard">
          <img src={cow.imgSrc} alt={cow.destTitle} className="cowImage" />
          <h2>{cow.destTitle}</h2>
          <p>{cow.description}</p>
          <p>
            <strong>Grade:</strong> {cow.grade}
          </p>
          <p>
            <strong>Age:</strong> {cow.location}
          </p>
          <p>
            <strong>Daily Production:</strong> {cow.production} ML
          </p>
        </div>
        <div className="charts">
          <div className="chart">
            <h3>Weekly Milk Production</h3>
            <div className="chart-container">
              <Bar data={weeklyData} options={chartOptions} />
            </div>
          </div>
          <div className="chart">
            <h3>Monthly Milk Production</h3>
            <div className="chart-container">
              <Bar data={monthlyData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default CowDetails;
