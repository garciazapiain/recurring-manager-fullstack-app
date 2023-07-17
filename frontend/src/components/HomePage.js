import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./UserDashboard/index.jsx";
import ProductLibrary from "./ProductLibrary/index.jsx";

const HomePage = () => {
  console.log('hey',process.env.REACT_APP_API_BASE_URL)
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({})
  useEffect(() => {
    // Fetch the data from the API endpoint
    console.log('hey',process.env.REACT_APP_API_BASE_URL)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/user/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.username) {
          // User is not logged in, redirect to the login page
          window.location.href = "/login/";
        } else {
          setUserData(data);
          setLoading(false);
        }
      });
  }, []);

  const handleLogout = () => {
    window.location.href = "/logout/";
    // Perform logout logic or redirect to the appropriate logout URL
    // You can use the 'history' object from React Router to navigate to the logout page
    // Example: history.push('/logout/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <p>Welcome {userData.username}</p>
              <button onClick={handleLogout}>Logout</button>
              <UserDashboard />
            </div>
          }
        />
        <Route
          path="/product-library"
          element={
            <div>
              <p>Welcome {userData.username}</p>
              <button onClick={handleLogout}>Logout</button>
              <ProductLibrary />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default HomePage;