// @ts-ignore
import React from "react";
import './style.css'

const NavBar = (props: any) => {
    const [navBarClosed, setNavBarClosed] = React.useState(true)
    function navBarToggle() {
        setNavBarClosed(!navBarClosed)
    }
    return (
        <div id="navBar" className="navBar">
            {navBarClosed ?
                <div>
                    <img className="burger" src="https://cdn-icons-png.flaticon.com/512/5358/5358649.png" alt="burger icon" onClick={navBarToggle} />
                </div>
                : 
                <div className="navBarOpenedContainer">
                    <a href="/" className="navBarOpenedContainerLinks">Home</a>
                    <a href="/productcategories" className="navBarOpenedContainerLinks"> Product Categories</a>
                    <a href="/userproducts" className="navBarOpenedContainerLinks">User Dashboard</a>
                    <img className="burger" src="https://cdn-icons-png.flaticon.com/512/5358/5358649.png" alt="burger icon" onClick={navBarToggle} />
                </div>
            }
        </div>
    )
}

export default NavBar