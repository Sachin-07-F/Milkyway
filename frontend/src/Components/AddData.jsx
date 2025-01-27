import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddData = () => {
  const { bookId } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    week1: '',
    week2: '',
    week3: '',
    week4: '',
    week5: '',
    sunday: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    january: '',
    february: '',
    march: '',
    april: '',
    may: '',
    june: '',
    july: '',
    august: '',
    september: '',
    october: '',
    november: '',
    december: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === '' ? 0 : Number(value)])
      );

      // Send data to the server
      await axios.post(`${process.env.REACT_APP_Backend_Url}/api/add-data/${bookId}`, {
        weeklyData: payload,
        dailyData: payload,
        monthlyData: payload,
      });

      toast.success('Data added successfully!',{
        position:'top-center',
        autoClose:3000,
      });
      Navigate('/');
    } catch (err) {
      console.error('Error adding data:', err.response?.data || err.message);
      toast.err('Failed to add data. Check the console for details.',{
        position:'top-center',
        autoClose:3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{color:'purple', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Add Data</h2>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60%',
          margin: '0 auto',
          marginBottom:'50px'
        }}
        onSubmit={handleSubmit}
      >
        {/* Weekly Data Section */}
        <div
          style={{
            backgroundColor: '#f2f2f2',
            padding: '20px',
            width: '100%',
            marginBottom: '20px',
            borderRadius: '10px',
          }}
        >
          <h3>Weekly Data</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {['week1', 'week2', 'week3', 'week4', 'week5'].map((field) => (
              <div key={field} style={{ width: '30%', marginBottom: '10px' }}>
                <label>{field}:</label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Data Section */}
        <div
          style={{
            backgroundColor: '#f2f2f2',
            padding: '20px',
            width: '100%',
            marginBottom: '20px',
            borderRadius: '10px',
          }}
        >
          <h3>Daily Data</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(
              (field) => (
                <div key={field} style={{ width: '30%', marginBottom: '10px' }}>
                  <label>{field}:</label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Monthly Data Section */}
        <div
          style={{
            backgroundColor: '#f2f2f2',
            padding: '20px',
            width: '100%',
            marginBottom: '20px',
            borderRadius: '10px',
          }}
        >
          <h3>Monthly Data</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[
              'january',
              'february',
              'march',
              'april',
              'may',
              'june',
              'july',
              'august',
              'september',
              'october',
              'november',
              'december',
            ].map((field) => (
              <div key={field} style={{ width: '30%', marginBottom: '10px' }}>
                <label>{field}:</label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddData;
