import React from "react";
import styles from "./styles.module.css";
import drawing from "./drawing.svg"
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
            <NavBar noLinks={false} id="top" />
            <div style={{ padding: "0.5rem" }} id="home" className={styles.landingPageCentralContainer}>
                <div className={styles.landingPageCentralContainerContent}>
                    <h1 style={{ color: "white", backgroundColor: "transparent", fontSize: "3rem" }}>Never run out!</h1>
                    <p style={{ color: "white", backgroundColor: "transparent", lineHeight: "2.5rem" }}>Recurring manager is your ultimate solution for managing recurring products effortlessly. Say goodbye to running out of your favorite items, as this app keeps you well-stocked at all times.</p>
                    <button style={{ marginLeft: "0" }} onClick={handleRegisterRedirect} className={styles.button}>Start now</button>
                </div>
                <div className={styles.landingPageCentralContainerImage}>
                    <img alt="drawing of recurring manager application" src={drawing}></img>
                </div>
            </div>
            <div style={{padding:"0.5rem"}} id="about">
                <About />
            </div>
            <div style={{width:"100%", display:"flex", height:"8vh", justifyContent:"flex-end", backgroundColor:"whitesmoke"}}>
                <p style={{color:"rgb(30, 32, 33)", margin:"0 1rem 0 0", display:"flex", alignItems:"center"}}>Recurring manager 2023</p>
            </div>
        </div>
    );
};

export default LandingPage;
