import React from "react";
import styles from "./styles.module.css";
import {BiLogOutCircle} from "react-icons/bi"

const ProfileHeader = ({userData}) => {
    const handleLogout = () => {
        window.location.href = "/logout/";
        // Perform logout logic or redirect to the appropriate logout URL
        // You can use the 'history' object from React Router to navigate to the logout page
        // Example: history.push('/logout/');
      };

    return (
        <div className={styles.profileHeader}>
            <p>Welcome {userData.username}</p>
            <BiLogOutCircle size={30} onClick={handleLogout}/>
        </div>
    );
};

export default ProfileHeader;
