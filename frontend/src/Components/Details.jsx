import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  ArcElement
);

const Details = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_Backend_Url}/api/details/${bookId}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  const generateChartData = (data) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Production Level",
        data: Object.values(data),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      },
    ],
  });

  const generatePieChartData = (maxProduction, minProduction, maxWeek, minWeek) => ({
    labels: [
      `Highest: ${maxWeek} (${maxProduction} ML)`,
      `Lowest: ${minWeek} (${minProduction} ML)`,
    ],
    datasets: [
      {
        data: [maxProduction, minProduction],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#81c784", "#e57373"],
      },
    ],
  });

  const calculateMinMax = (data) => {
    const productionValues = Object.values(data);
    const maxProduction = Math.max(...productionValues);
    const minProduction = Math.min(...productionValues);
    const maxWeekIndex = productionValues.indexOf(maxProduction);
    const minWeekIndex = productionValues.indexOf(minProduction);
    return {
      maxProduction,
      minProduction,
      maxWeek: `Week ${maxWeekIndex + 1}`,
      minWeek: `Week ${minWeekIndex + 1}`,
    };
  };

  const generateReviewAndGoal = (data, periodType) => {
    const productionValues = Object.values(data);
    const totalProduction = productionValues.reduce((acc, val) => acc + val, 0);
    const averageProduction = totalProduction / productionValues.length;
  
    const lastProduction = productionValues[productionValues.length - 1];
    const previousProduction = productionValues.length > 1 ? productionValues[productionValues.length - 2] : 0;
  
    let review = "";
    let goal = "";
  
    // Define period-specific reviews and goals
    switch (periodType) {
      case "Weekly":
        if (lastProduction > averageProduction * 1.5) {
          review = `🌟 Outstanding week! Your production was more than 50% above average. Keep up the excellent work! 🚀`;
          goal = `👏 Aim to maintain this exceptional performance next week. You're on fire! 🔥`;
        } else if (lastProduction > averageProduction * 1.2) {
          review = `🌟 Great job! Your production was significantly above average this week. Keep it up!`;
          goal = `👏 Stay consistent, and you'll hit even higher marks next week.`;
        } else if (lastProduction > averageProduction) {
          review = `🌞 Well done! Your production exceeded average this week. Keep pushing yourself!`;
          goal = `💡 Focus on sustaining this performance in the coming weeks.`;
        } else if (lastProduction > averageProduction * 0.8) {
          review = `🤔 You were close to average, but there’s room for improvement.`;
          goal = `📈 Try to exceed average production next week for a better result.`;
        } else if (lastProduction === averageProduction) {
          review = `🔵 Consistency is key. Your weekly production was exactly average.`;
          goal = `🔍 Focus on small improvements to surpass the average next week.`;
        } else if (lastProduction > previousProduction) {
          review = `⏫ You showed improvement compared to the previous week. Keep it up!`;
          goal = `💡 Keep refining your approach to sustain this growth.`;
        } else {
          review = `⚠️ Your weekly production was below average. It’s time to analyze and make adjustments.`;
          goal = `📊 Focus on improving production consistency in the next week.`;
        }
        break;
  
      case "Daily":
        if (lastProduction > averageProduction * 1.5) {
          review = `🌞 Fantastic day! Your production is more than 50% above average.`;
          goal = `💪 Keep pushing to achieve this every day!`;
        } else if (lastProduction > averageProduction * 1.2) {
          review = `🌟 Great job today! Your production is well above average.`;
          goal = `👏 Keep up this pace, and consistency will come naturally.`;
        } else if (lastProduction > averageProduction) {
          review = `🌞 Good job! You exceeded average production today.`;
          goal = `📅 Try to reach this level consistently for a stronger habit.`;
        } else if (lastProduction === averageProduction) {
          review = `🔵 Consistency is key. Your daily production is average.`;
          goal = `🔍 Try to push for slightly higher numbers each day.`;
        } else if (lastProduction < averageProduction * 0.8) {
          review = `⚠️ Your daily production is significantly below average.`;
          goal = `💡 Review your strategy and try to hit your average tomorrow.`;
        } else if (lastProduction < previousProduction) {
          review = `⏬ There was a drop in production compared to yesterday.`;
          goal = `🔄 Work on your strategy to regain that level of production.`;
        } else {
          review = `🤔 Your production was close to average today, but improvement is needed.`;
          goal = `📈 Try to boost tomorrow's production to surpass the average.`;
        }
        break;
  
      case "Monthly":
        if (lastProduction > averageProduction * 1.5) {
          review = `🌟 Outstanding month! Your production is over 50% above average. Keep it going! 🚀`;
          goal = `👏 Continue this level of performance, and aim for even higher consistency next month.`;
        } else if (lastProduction > averageProduction * 1.2) {
          review = `🌟 Fantastic job this month! You’ve consistently exceeded the average production.`;
          goal = `👏 Set your sights on an even better month with a small push.`;
        } else if (lastProduction > averageProduction) {
          review = `🌞 Well done! Your production was above average this month.`;
          goal = `🔍 Try to increase the monthly total further next month.`;
        } else if (lastProduction === averageProduction) {
          review = `🔵 Your monthly production was average.`;
          goal = `🔄 Work on improving next month by focusing on small improvements.`;
        } else if (lastProduction < averageProduction * 0.8) {
          review = `⚠️ Your monthly production was below average. Time to reflect on what went wrong.`;
          goal = `📈 Improve your consistency and aim for better results next month.`;
        } else if (lastProduction < previousProduction) {
          review = `⏬ There was a decline compared to last month.`;
          goal = `🔍 Identify areas for improvement and aim for better results next month.`;
        } else {
          review = `🤔 Your monthly production is consistent, but there is room for growth.`;
          goal = `📈 Aim to increase production next month with a focused effort.`;
        }
        break;
  
      default:
        review = `No data available for the selected period.`;
        goal = `Please add some data to generate reviews and goals.`;
        break;
    }
  
    return { review, goal };
  };
  

  const renderCharts = (data, chartType) => {
    if (!data) return null;
    const chartData = generateChartData(data);
    const { maxProduction, minProduction, maxWeek, minWeek } = calculateMinMax(data);
    const pieChartData = generatePieChartData(maxProduction, minProduction, maxWeek, minWeek);
    const reviewGoal = generateReviewAndGoal(data);

    return (
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{color:'blueviolet'}}>{chartType} Production Data</h3>
        <div
          style={{
            position: "relative",
            height: "300px",
            width: "100%",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div
          style={{
            margin: "0 auto",
            width: "60%",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            backgroundColor: "#ddd",
          }}
        >
          <h4>Highest vs. Lowest Production</h4>
          <Doughnut data={pieChartData} />
        </div>
       
      </div>
    );
  };



const renderReviewAndGoal = (data, periodType) => {
  const reviewGoal = generateReviewAndGoal(data, periodType);
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px dashed #007bff",
        borderRadius: "10px",
        backgroundColor: "#f9fff9",
        color:"green",
      }}
    >
      <h4 style={{ color: "skyblue" }}>Review:</h4>
      <p>{reviewGoal.review}</p>
      <h4 style={{ color: "#007bff" }}>Goal:</h4>
      <p>{reviewGoal.goal}</p>
    </div>
  );
};




  const renderAddDataButton = () => (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      }}
      onClick={() => navigate(`/add-data/${bookId}`)}
    >
      Add Data
    </button>
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Production Data</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div> 
          <h1 style={{color:'rgba(245,45,516,41)'}}>There is no data for this cow.. add Data...👇🏾</h1>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={() => navigate(`/add-data/${bookId}`)}
          >
            Add Data
          </button>
        </div>
      ) : (
        <div style={{ margin: "0 auto", maxWidth: "900px" }}>
          {data.dailyData ? renderCharts(data.dailyData, "Daily") : renderAddDataButton()}
          {data.dailyData ? renderReviewAndGoal(data.dailyData, "Daily") : renderAddDataButton()}

          <br/>< hr/><br/>
          {data.monthlyData ? renderCharts(data.monthlyData, "Monthly") : renderAddDataButton()}
          {data.monthlyData ? renderReviewAndGoal(data.monthlyData, "Monthly") : renderAddDataButton()}

          <br/>< hr/><br/>
          {data.weeklyData ? renderCharts(data.weeklyData, "Weekly") : renderAddDataButton()}
          {data.weeklyData ? renderReviewAndGoal(data.weeklyData, "Weekly") : renderAddDataButton()}

        </div>
        
      )}
    </div>
  );
};

export default Details;


