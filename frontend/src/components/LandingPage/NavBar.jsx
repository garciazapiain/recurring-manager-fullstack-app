import React from 'react';
import styles from "./styles.module.css";
import logo from "./logo.png";

function NavBar({ noLinks }) {
    const handleLoginRedirect = () => {
        window.location.href = "/login/";
    }

    const handleHomeRedirect = () => {
        window.location.href = "/"
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <a href="#top" onClick={noLinks? handleHomeRedirect : null} className={styles.logo}><img src={logo} alt="Logo"></img></a>
                <div className="navLinks">
                    {!noLinks ? (
                        <>
                            <a href="#about">About</a>
                            <a href="#" onClick={handleLoginRedirect}>Log In</a>
                        </>
                    ) : null}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
