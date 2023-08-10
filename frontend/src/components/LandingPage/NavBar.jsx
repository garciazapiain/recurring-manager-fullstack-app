import React from 'react';
import styles from "./styles.module.css";
import logo from "./logo.png"

function NavBar() {
    const handleLoginRedirect = () => {
        window.location.href = "/login/"
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <a href="#top" className={styles.logo}><img src={logo}></img></a>
                <div className="navLinks">
                    <a href="#about">About</a>
                    <a href="#" onClick={handleLoginRedirect}>Log In</a>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
