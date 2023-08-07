import React from "react";
import styles from "./styles.module.css";
import { BiLogOutCircle } from "react-icons/bi"
import DarkModeToggle from "../shared/DarkMode/index.jsx";

const ProfileHeader = ({ userData }) => {
    const handleLogout = () => {
        window.location.href = "/logout/";
        // Perform logout logic or redirect to the appropriate logout URL
        // You can use the 'history' object from React Router to navigate to the logout page
        // Example: history.push('/logout/');
    };

    return (
        <div className={styles.profileHeader}>
            <p>Welcome {userData.username}</p>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "1rem" }}>
                    <DarkModeToggle />
                </div>
                <BiLogOutCircle size={30} onClick={handleLogout} />
            </div>
        </div>
    );
};

export default ProfileHeader;
