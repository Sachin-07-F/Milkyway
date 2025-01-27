import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ChartCow = ({ cowId }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/cows/${cowId}/chart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChartData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chart data');
      }
    };

    fetchChartData();
  }, [cowId]);

  if (error) return <p className="error">{error}</p>;
  if (!chartData) return <p>Loading chart...</p>;

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Daily Production (ML)',
        data: chartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="chartCow">
      <h2>Production Chart</h2>
      <Bar data={chartConfig} options={{ responsive: true }} />
    </div>
  );
};

export default ChartCow;
