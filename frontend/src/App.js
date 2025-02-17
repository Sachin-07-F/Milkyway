import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Navbar2 from "./Components/Navbar/Navbar2.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import Main from "./Components/Main/Main.jsx";
import Contacts from "./Components/Contacts/Contacts.jsx";
import About from "./Components/About/About.jsx";
import CowDetails from "./Components/CowDetails/CowDetails.jsx";
import img from "./Assest/calm-cow.jpg";
import img2 from "./Assest/Daisy-cow.jpg";
import img3 from "./Assest/3rd-cow.jpeg";
import img4 from "./Assest/cow-4.jpeg";
import img5 from "./Assest/5th-cow.jpg";
import img6 from "./Assest/cow-6th.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Some from "./Components/Some/Some.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import AllCow from "./Components/Main/Main.jsx";
import WelcomePage from "./Components/Dashboard/WelcomePage.jsx";
import Profile from "./Components/Dashboard/Profile.jsx";
import { Toaster } from "react-hot-toast";
import AddBook from "./Components/AddBook.jsx";
import Books from "./Components/Books.jsx";
import EditBook from "./Components/EditBook.jsx";
import DeleteBook from "./Components/DeleteBook.jsx";
import BookCard from "./Components/BookCard.jsx";
import EmailForm from "./Components/OTPForm.jsx";
import OTPForm from "./Components/OTPForm.jsx";
import Details from "./Components/Details.jsx";
import AddData from "./Components/AddData.jsx";
import BookCards from "./Components/BookCards.jsx";
import FAQ from "./Components/FAQ.jsx";
import UserGuide from "./Components/UserGuide.jsx";


// const App = () => {
//   const [filters, setFilters] = useState(null);

//   const handleFilter = (filterData) => setFilters(filterData);
//   const clearFilter = () => setFilters(null);

//   const [isVerified, setIsVerified] = useState(false);

//   const handleOTPVerification = (status) => {
//     if (status) {
//       setIsVerified(true);
//       // toast.success("OTP Verified Successfully!");
//     } else {
//       // toast.error("OTP Verification Failed!");
//     }
//   };

//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const userEmail = localStorage.getItem("email"); // Get email from localStorage

//   const fetchBooks = async () => {
//     const response = await fetch(`/api/cows?email=${userEmail}`);
//     const data = await response.json();
//     setBooks(data);
//     setFilteredBooks(data);
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleFilters = (filters) => {
//     let filtered = books;

//     if (filters.name) {
//       filtered = filtered.filter((book) =>
//         book.name.toLowerCase().includes(filters.name.toLowerCase())
//       );
//     }
//     if (filters.production) {
//       filtered = filtered.filter(
//         (book) => book.production >= filters.production
//       );
//     }

//     setFilteredBooks(filtered);
//   };

//   const handleClearFilter = () => {
//     setFilteredBooks(books);
//   };

//   return (
//     <Router>

//       <ToastContainer />
//       {/* <Toaster progress={true} /> */}

//       <Routes>
//       <App />
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <Home onFilter={handleFilter} onClearFilter={handleClearFilter} />
//               {filteredBooks.map(book => (
//           <BookCards key={book._id} book={book} />
//         ))}
//               <Main/>
//             </>
//           }
//         />
//         <Route
//           path="/books"
//           element={
//             isVerified ? (
//               <>
//                 <Books />
//               </>
//             ) : (
//               <>
//                 <EmailForm onVerify={handleOTPVerification} />
//               </>
//             )
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <>
//               <Navbar />
//               <Contacts />{" "}
//             </>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <>
//               <Navbar />
//               <About />{" "}
//             </>
//           }
//         />
//         <Route
//           path="/cows"
//           element={
//             <>
//               <Navbar />
//               <OTPForm />{" "}
//             </>
//           }
//         />
//         <Route
//           path="/cow/:id"
//           element={
//             <>
//               <Navbar />
//               <Main />{" "}
//             </>
//           }
//         />
//         <Route path="/some" element={<Some />} />
//         <Route
//           path="/signup"
//           element={
//             <>
//               <Navbar />
//               <Signup />
//             </>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <>
//               <Navbar />
//               <Login />
//             </>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <>
//               <Navbar />
//               <Dashboard /> <WelcomePage />
//             </>
//           }
//         />
//         <Route
//           path="/welcome"
//           element={
//             <>
//               <Navbar />
//               <WelcomePage />
//               <AddBook />
//             </>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <>
//               <Navbar />
//               <Profile />
//             </>
//           }
//         />
//         <Route path="/addbook" element={<AddBook />} />
//         <Route path="/book/:id" element={<EditBook />} />
//         <Route path="/delete/:id" element={<DeleteBook />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/api/otp" element={<EmailForm />} />
//         <Route path="/details/:bookId" element={<Details />} />
//         <Route path="/add-data/:bookId" element={<AddData />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;
// // //above v-1










// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Navbar from "./Components/Navbar/Navbar.jsx";
// import Footer from "./Components/Footer/Footer.jsx";
// import Home from "./Components/Home/Home.jsx";
// import Main from "./Components/Main/Main.jsx";
// import Contacts from "./Components/Contacts/Contacts.jsx";
// import About from "./Components/About/About.jsx";
// import CowDetails from "./Components/CowDetails/CowDetails.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Some from "./Components/Some/Some.jsx";
// import AllCow from "./Components/Main/Main.jsx";
// import { Toaster } from "react-hot-toast";
// import EditBook from "./Components/EditBook.jsx";
//  import DeleteBook from "./Components/DeleteBook.jsx";
//  import BookCard from "./Components/BookCard.jsx";
// import EmailForm from "./Components/OTPForm.jsx";
// import Signup from "./Components/Signup/Signup.jsx";
// import Login from "./Components/Login/Login.jsx";
// import Dashboard from "./Components/Dashboard/Dashboard.jsx";
// import WelcomePage from "./Components/Dashboard/WelcomePage.jsx";
// import Profile from "./Components/Dashboard/Profile.jsx";
// import Books from "./Components/Books.jsx";
// import Details from "./Components/Details.jsx";
// import AddData from "./Components/AddData.jsx";
// import OTPForm from "./Components/OTPForm.jsx";
// import AddBook from "./Components/AddBook.jsx";
// import BookCards from "./Components/BookCards.jsx";

// // App component
// const App = () => {
//   const [filters, setFilters] = useState(null);
//   const [isVerified, setIsVerified] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const userEmail = localStorage.getItem("email");

//   // Fetch books function
//   const fetchBooks = async () => {
//     const response = await fetch(`/api/cows?email=${userEmail}`);
//     const data = await response.json();
//     setBooks(data);
//     setFilteredBooks(data);
//   };

//   // Fetch books on component mount
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // Handle filter state
//   const handleFilter = (filterData) => setFilters(filterData);
//   const clearFilter = () => setFilters(null);

//   // Handle OTP verification
//   const handleOTPVerification = (status) => {
//     setIsVerified(status);
//   };

//   // Filter books based on name or production
//   const handleFilters = (filters) => {
//     let filtered = books;
//     if (filters.name) {
//       filtered = filtered.filter((book) =>
//         book.name.toLowerCase().includes(filters.name.toLowerCase())
//       );
//     }
//     if (filters.production) {
//       filtered = filtered.filter(
//         (book) => book.production >= filters.production
//       );
//     }
//     setFilteredBooks(filtered);
//   };

//   // Clear filters
//   const handleClearFilter = () => {
//     setFilteredBooks(books);
//   };

//   return (
//     <Router>
//       <ToastContainer />
//       <Navbar />

//       {/* Main Routes */}
//       <Routes>
//         {/* Home Route */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Home onFilter={handleFilter} onClearFilter={handleClearFilter} />
//               {filteredBooks.map((book) => (
//                 <BookCards key={book._id} book={book} />
//               ))}
//               <Main />
//             </>
//           }
//         />

//         {/* Books Route (Conditional on OTP verification) */}
//         <Route
//           path="/books"
//           element={
//             isVerified ? (
//               <Books />
//             ) : (
//               <OTPForm onVerify={handleOTPVerification} />
//             )
//           }
//         />
//         <Route
//           path="/cows"
//           element={
//              <>
//                <Navbar />
//                <OTPForm />{" "}
//              </>
//            }
//         />

//         {/* Contact Route */}
//         <Route
//           path="/contact"
//           element={
//             <>
//               <Contacts />
//             </>
//           }
//         />

//         {/* About Route */}
//         <Route
//           path="/about"
//           element={
//             <>
//               <About />
//             </>
//           }
//         />

//         {/* Signup Route */}
//         <Route
//           path="/signup"
//           element={
//             <>
//               <Signup />
//             </>
//           }
//         />

//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={
//             <>
//               <Login />
//             </>
//           }
//         />

//         {/* Dashboard Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <>
//               <Dashboard />
//               <WelcomePage />
//             </>
//           }
//         />

       
//         <Route
//           path="/profile"
//           element={
//             <>
//               <Profile />
//             </>
//           }
//         />

        
//         <Route path="/addbook" element={<AddBook />} />
//         <Route path="/book/:id" element={<AddBook />} />

//         {/* Other Routes for Book Handling */}
//         <Route path="/books" element={<Books />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// export default App;











// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Main from './components/Main';
// import BookCards from './components/BookCards';
// import Books from './components/Books';
// import OTPForm from './components/OTPForm';
// import Contacts from './components/Contacts';
// import About from './components/About';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Profile from './components/Profile';
// import Footer from './components/Footer';
// import AddBook from './components/AddBook';
// import EditBook from './components/EditBook';
// import DeleteBook from './components/DeleteBook';
// import Details from './components/Details';
// import AddData from './components/AddData';
// import WelcomePage from './components/WelcomePage';

const App = () => {
  const [filters, setFilters] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const userEmail = localStorage.getItem("email"); // Get email from localStorage

  // Fetch books function
  const fetchBooks = async () => {
    const response = await fetch(`/api/cows?email=${userEmail}`);
    const data = await response.json();
    setBooks(data);
    setFilteredBooks(data);
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle OTP verification
  const handleOTPVerification = (status) => {
    if (status) {
      setIsVerified(true);
    }
  };

  // Handle filter state
  const handleFilter = (filterData) => setFilters(filterData);
  const clearFilter = () => setFilters(null);

  // Filter books based on name or production
  const handleFilters = (filters) => {
    let filtered = books;
    if (filters.name) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.production) {
      filtered = filtered.filter(
        (book) => book.production >= filters.production
      );
    }
    setFilteredBooks(filtered);
  };

  // Clear filters
  const handleClearFilter = () => {
    setFilteredBooks(books);
  };

  return (
    // <Router>
    //   <ToastContainer />
    //   <Navbar />
      
    //   <Routes>
        
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //           <Home onFilter={handleFilter} onClearFilter={handleClearFilter} />
    //           {filteredBooks.map((book) => (
    //             <BookCards key={book._id} book={book} />
    //           ))}
    //           <Main />
    //         </>
    //       }
    //     />
        
       
    //     <Route
    //       path="/books"
    //       element={
    //         isVerified ? (
    //           <Books />
    //         ) : (
    //           <OTPForm onVerify={handleOTPVerification} />
    //         )
    //       }
    //     />

        
    //     <Route
    //       path="/cows"
    //       element={
    //         <>
    //           <Navbar />
    //           <OTPForm />
    //         </>
    //       }
    //     />

        
    //     <Route
    //       path="/contact"
    //       element={
    //         <>
    //           <Contacts />
    //         </>
    //       }
    //     />

        
    //     <Route
    //       path="/about"
    //       element={
    //         <>
    //           <About />
    //         </>
    //       }
    //     />

       
    //     <Route
    //       path="/signup"
    //       element={
    //         <>
    //           <Signup />
    //         </>
    //       }
    //     />

        
    //     <Route
    //       path="/login"
    //       element={
    //         <>
    //           <Login />
    //         </>
    //       }
    //     />

        
    //     <Route
    //       path="/dashboard"
    //       element={
    //         <>
    //           <Dashboard />
    //           <WelcomePage />
    //         </>
    //       }
    //     />

       
    //     <Route
    //       path="/profile"
    //       element={
    //         <>
    //           <Profile />
    //         </>
    //       }
    //     />

       
    //     <Route path="/addbook" element={<AddBook />} />
        
        
    //     <Route path="/book/:id" element={<EditBook />} />
        
       
    //     <Route path="/delete/:id" element={<DeleteBook />} />
        
       
    //     <Route path="/details/:bookId" element={<Details />} />
        
        
    //     <Route path="/add-data/:bookId" element={<AddData />} />
    //   </Routes>
      
    //   <Footer />
    // </Router>



    <Router>
      <FAQ />
  <ToastContainer />
  {/* <Toaster progress={true} /> */}

  <Routes>
    <Route
      path="/"
      element={
        <>
          <Navbar />
          <Home onFilter={handleFilter} onClearFilter={handleClearFilter} />
          {filteredBooks.map((book) => (
            <BookCards key={book._id} book={book} />
          ))}
          <Main />
        </>
      }
    />
    <Route
      path="/books"
      element={
        isVerified ? (
          <>
            <Books />
          </>
        ) : (
          <>
            <EmailForm onVerify={handleOTPVerification} />
          </>
        )
      }
    />
    <Route
      path="/contact"
      element={
        <>
          <Navbar />
          <Contacts />{" "}
        </>
      }
    />
    <Route
      path="/about"
      element={
        <>
          <Navbar />
          <About />{" "}
        </>
      }
    />
    <Route
      path="/cows"
      element={
        <>
          <Navbar />
          <OTPForm />{" "}
        </>
      }
    />
    <Route
      path="/cow/:id"
      element={
        <>
          <Navbar />
          <Main />{" "}
        </>
      }
    />
    <Route path="/some" element={<Some />} />
    <Route path="/user-guide" element={<><Navbar/><UserGuide /> </>}/>
    <Route
      path="/signup"
      element={
        <>
          <Navbar />
          <Signup />
        </>
      }
    />
    <Route
      path="/login"
      element={
        <>
          <Navbar />
          <Login />
        </>
      }
    />
    <Route
      path="/dashboard"
      element={
        <>
          <Navbar />
          <Dashboard /> <WelcomePage />
        </>
      }
    />
    <Route
      path="/welcome"
      element={
        <>
          <Navbar />
          <WelcomePage />
          <AddBook />
        </>
      }
    />
    <Route
      path="/profile"
      element={
        <>
          <Navbar />
          <Profile />
        </>
      }
    />
    <Route path="/addbook" element={<AddBook />} />
    <Route path="/book/:id" element={<EditBook />} />
    <Route path="/delete/:id" element={<DeleteBook />} />
    <Route path="/books" element={<Books />} />
    <Route path="/api/otp" element={<EmailForm />} />
    <Route path="/details/:bookId" element={<Details />} />
    <Route path="/add-data/:bookId" element={<AddData />} />
  </Routes>
  <Footer />
</Router>



  );
};

export default App;
