import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./UserDashboard/index.jsx";
import ProductLibrary from "./ProductLibrary/index.jsx";
import ProfileHeader from "./ProfileHeader/index.jsx";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({})
  useEffect(() => {
    // Fetch the data from the API endpoint
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
              <ProfileHeader userData={userData}/>
              <UserDashboard />
            </div>
          }
        />
        <Route
          path="/product-library"
          element={
            <div>
              <ProfileHeader userData={userData}/>
              <ProductLibrary />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default HomePage;
