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
                    <img data-cy="nav-bar-burger" className="burger" src="https://cdn-icons-png.flaticon.com/512/5358/5358649.png" alt="burger icon" onClick={navBarToggle} />
                </div>
                : 
                <div data-cy="nav-bar" className="navBarOpenedContainer">
                    {/* <a data-cy="nav-bar-home" href="/" className="navBarOpenedContainerLinks">Home</a> */}
                    <a data-cy="nav-bar-user" href="/" className="navBarOpenedContainerLinks">My products</a>
                    <a data-cy="nav-bar-product-categories" href="/productcategories" className="navBarOpenedContainerLinks">Explore products</a>
                    <img className="burger" src="https://cdn-icons-png.flaticon.com/512/5358/5358649.png" alt="burger icon" onClick={navBarToggle} />
                </div>
            }
        </div>
    )
}

export default NavBar