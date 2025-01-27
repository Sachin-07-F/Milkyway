import React, { useState, useEffect } from "react";
import "./welcome.css";
import axios from "axios";
import FormTable from "./Formtable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Books from '../../Components/Books.jsx'


axios.defaults.baseURL = `${process.env.REACT_APP_Backend_Url}/cows/`;

const WelcomePage = () => {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", image: null });
  const [dataList, setDataList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState({ name: "", email: "", mobile: "", _id: "", image: "" });

  const handleOnChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const { data } = await axios.post("/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        setAddSection(false);
        toast.success(data.message || "Data saved successfully!", {
          position: "top-center",
          duration: 3000,
        });
        getFetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save data. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const getFetchData = async () => {
    try {
      const { data } = await axios.get("dashboard");
      if (data.success) {
        setDataList(data.data);
      } else {
        toast.error(data.message || "Error fetching data.", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getFetchData();
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/delete/${id}`);
      if (data.success) {
        toast.success(data.message || "Data deleted successfully!", {
          position: "top-center",
          duration: 3000,
        });
        getFetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete data. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("_id", formDataEdit._id);
    formDataToSend.append("name", formDataEdit.name);
    formDataToSend.append("email", formDataEdit.email);
    formDataToSend.append("mobile", formDataEdit.mobile);
    if (formDataEdit.image) {
      formDataToSend.append("image", formDataEdit.image);
    }

    try {
      const { data } = await axios.put("/update", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        getFetchData();
        toast.success(data.message || "Data updated successfully!", {
          position: "top-center",
          duration: 3000,
        });
        setEditSection(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update data. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name, type, files } = e.target;
    if (type === "file") {
      setFormDataEdit((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormDataEdit((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (data) => {
    setFormDataEdit(data);
    setEditSection(true);
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? (
        <div className="containers">
          <button
            id="btnss"
            className="btns btns-add"
            onClick={() => {
              setFormData({ name: "", email: "", mobile: "", image: null });
              setAddSection(true);
            }}
          >
            Add
          </button>

          {addSection && (
            <FormTable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddSection(false)}
              rest={formData}
            />
          )}
          {editSection && (
            <FormTable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )}

          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 ? (
                  dataList.map((data) => (
                    <tr key={data._id}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.mobile}</td>
                      <td>
                        {data.image && (
                          <img src={`${process.env.REACT_APP_Backend_Url}/${data.image}`} alt="Cow" style={{ width: '50px', height: '50px' }} />
                        )}
                      </td>
                      <td>
                        <button id="edit" className="btn btn-edit" onClick={() => handleEdit(data)}>
                          Edit
                        </button>
                        <button id="delete" className="btn btn-delete" onClick={() => handleDelete(data._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>,
        <Books />
      ) : (
        <div>
          <h1 style={{ marginLeft: '370px', marginTop: '100px', marginBottom: '70px', color: 'red', fontWeight: 'bold' }}>
            Please <a style={{ color: 'rgba(101, 163, 7, 0.78)', textDecoration: 'none' }} href="/login">Login</a> First
          </h1>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;











