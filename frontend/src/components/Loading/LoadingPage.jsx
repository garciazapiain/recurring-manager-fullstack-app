
import React from "react";
import logo from "../LandingPage/logo.png"
import styles from "./styles.module.css";

const LoadingPage = (darkModeOn) => {
  return (
    <div className={styles.loadingContainer}>
      <img src={logo}></img>
    </div>
  );
};

export default LoadingPage
