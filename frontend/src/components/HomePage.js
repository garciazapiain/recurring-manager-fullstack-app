import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./UserDashboard/index.jsx";
import ProductLibrary from "./ProductLibrary/index.jsx";
import ProfileHeader from "./ProfileHeader/index.jsx";
import LandingPage from "./LandingPage/index.jsx";
import { useAtom } from 'jotai';
import { darkModeAtom } from '../components/shared/DarkMode/darkModeAtom.js'; // Import the darkModeAtom
import sharedStyles from "../components/shared/styles.module.css";
import LoadingPage from "./Loading/LoadingPage.jsx";
import Login from "./Login/index.jsx";


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({})
  const [darkModeOn] = useAtom(darkModeAtom); // Access the state of darkModeAtom
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/user/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.username) {
          // User is not logged in, redirect to the login page
          setUserData(null)
          setLoading(false);
        } else {
          setUserData(data);
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    // Update the CSS variables for background and color based on darkModeOn
    const root = document.querySelector(":root");
    root.style.setProperty("--bg-color", darkModeOn ? "black" : "white");
    root.style.setProperty("--color", darkModeOn ? "white" : "black");
  }, [darkModeOn]);
  if (loading) {
    return <LoadingPage darkModeOn={darkModeOn} />
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userData ?
              <div style={{ "--bg-color": darkModeOn ? "black" : "white", "--color": darkModeOn ? "white" : "black" }} className={sharedStyles.background}>
                <ProfileHeader userData={userData} />
                <UserDashboard />
              </div>
              : <LandingPage />
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/product-library"
          element={
            <div style={{ "--bg-color": darkModeOn ? "black" : "white", "--color": darkModeOn ? "white" : "black" }} className={sharedStyles.background}>
              <ProfileHeader userData={userData} />
              <ProductLibrary />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default HomePage;
