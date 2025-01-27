// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.js";
// // import { Provider } from "react-redux";
// // import { configureStore } from "@reduxjs/toolkit";
// // import rootReducer from "./reducers";
// import { AuthProvider } from "./Components/Dashboard/AuthContext.jsx";
// // import { AuthProvider } from './AuthContext';



// // Wrap App with the Provider and pass the store
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//  <AuthProvider>

//     <App />
//   </AuthProvider>
// );





import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./Components/Dashboard/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
