import React from "react";
import styles from "./styles.module.css";
import sharedStyles from "../shared/styles.module.css"

const LandingPage = () => {
    const handleLoginRedirect = () => {
        window.location.href = "/login/"
    }
    const handleRegisterRedirect = () => {
        window.location.href = "/register/"
    }

    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.landingPageCentralContainer}>
                <div className={styles.landingPageCentralContainerContent}>
                    <div>
                        <h1>Never run out!</h1>
                        <p>Recurring manager is your ultimate solution for managing recurring products effortlessly. Say goodbye to running out of your favorite items, as this app keeps you well-stocked at all times.</p>
                        <button onClick={handleRegisterRedirect} className={styles.button}>Start now</button>
                        <button onClick={handleLoginRedirect} className={styles.button}>Login</button>
                        {/* <ul>
                        <li>
                            Stay Organized: Easily organize and track all your essential recurring products in one place. No more last-minute panic runs to the store or forgetting to restock important items.
                        </li>
                        <li>
                            Smart Reminders: Receive timely reminders when it's time to replenish your supplies. Our app intelligently analyzes your usage patterns and ensures you never miss a beat.
                        </li>
                        <li>
                            Convenience Redefined: Enjoy the convenience of automated shopping lists, personalized alerts, and seamless synchronization across all your devices. "Never Run Out" empowers you to focus on what matters most while taking care of the rest.
                        </li>
                    </ul> */}
                    </div>
                </div>
                <div className={styles.landingPageCentralContainerImage}>
                    <p>Drawing here</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
