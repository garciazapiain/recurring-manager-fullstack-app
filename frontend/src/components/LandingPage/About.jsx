import React from 'react';
import styles from "./styles.module.css";
import step1 from "./step1.png"
import step2 from "./step2.png"
import step3 from "./step3.png"
import step4 from "./step4.png"

function About() {

    return (
        <div className={styles.aboutSectionContainer}>
            <h1 style={{ color: "black", backgroundColor: "transparent", fontSize: "3rem" }}>How it works</h1>
            <div className={styles.stepsContainer}>
                <div className={styles.step}>
                    <img src={step1} alt="Step 1" />
                    <p style={{color:"black"}}>Add products you use from our library of products</p>
                </div>
                <div className={styles.step}>
                    <img src={step2} alt="Step 2" />
                    <p style={{color:"black"}}>Configure if needed things like standard size and the use days of each product</p>
                </div>
                <div className={styles.step}>
                    <img src={step3} alt="Step 3" />
                    <p style={{color:"black"}}>Check on how many days certain products will need replenishment</p>
                </div>
                <div className={styles.step}>
                    <img src={step4} alt="Step 4" />
                    <p style={{color:"black"}}>Update your inventory once you stock up on a product</p>
                </div>
            </div>
        </div>
    );
}

export default About;
