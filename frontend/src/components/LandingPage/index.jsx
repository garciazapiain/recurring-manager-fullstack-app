import React from "react";
import styles from "./styles.module.css";
import drawing from "./drawing.png"
import NavBar from "./NavBar.jsx";
import About from "./About.jsx";

const LandingPage = () => {
    const handleLoginRedirect = () => {
        window.location.href = "/login/"
    }
    const handleRegisterRedirect = () => {
        window.location.href = "/register/"
    }

    return (
        <div className={styles.landingPageContainer}>
            <NavBar id="top" />
            <div id="home" className={styles.landingPageCentralContainer}>
                <div className={styles.landingPageCentralContainerContent}>
                    <div>
                        <h1 style={{ color: "black", backgroundColor: "transparent", fontSize: "3rem" }}>Never run out!</h1>
                        <p style={{ color: "black", backgroundColor: "transparent" }}>Recurring manager is your ultimate solution for managing recurring products effortlessly. Say goodbye to running out of your favorite items, as this app keeps you well-stocked at all times.</p>
                        <button style={{ marginLeft: "0" }} onClick={handleRegisterRedirect} className={styles.button}>Start now</button>
                    </div>
                </div>
                <div className={styles.landingPageCentralContainerImage}>
                    <img alt="drawing of recurring manager application" src={drawing}></img>
                </div>
            </div>
            <div id="about">
                <About/>
            </div>
        </div>
    );
};

export default LandingPage;
