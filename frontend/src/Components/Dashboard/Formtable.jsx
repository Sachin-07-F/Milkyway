import React from "react";

const FormTable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <span onClick={handleclose} className="close-btn">×</span>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={rest.name}
          onChange={handleOnChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={rest.email}
          onChange={handleOnChange}
          required
        />
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={rest.mobile}
          onChange={handleOnChange}
          required
        />
        <label>Image</label>
        <input
          type="file"
          name="image"
          onChange={handleOnChange}
          accept="image/*"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormTable;
