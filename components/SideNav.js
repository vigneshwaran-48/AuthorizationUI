import React from "react";
import { Common } from "../utility/Common";
import { NavLink } from "react-router-dom";
import { UserAPI } from "../api/UserAPI";

const SideNav = ({ className }) => {

    const handleLogout = async () => {
        const response = await UserAPI.logout();
        if(response.ok) {
            window.location.href = "http://localhost:9090/logout";
        }
    }
    
    const navElems = Common.accountsSideNav.map(sideNav => {
        return (
            <NavLink 
                to={ sideNav.link } 
                key={ sideNav.id }
                id="accounts-side-nav-id"
                className={({ isActive }) => {
                    return isActive ? "accounts-side-nav accounts-side-nav-active x-axis-flex"
                                    : "accounts-side-nav x-axis-flex"
                }}
            >
                { sideNav.iconTag }
                <p className="hide-on-mobile">{ sideNav.name }</p>
            </NavLink>
        )
    });

    const logoutButton = (
        <button 
            className="common-button accounts-side-nav logout-button x-axis-flex"
            onClick={handleLogout}
        >
            <i className="bi bi-box-arrow-left"></i>
            <p className="hide-on-mobile">Logout</p>
        </button>
    );

    navElems.push(logoutButton);
   
    const checkForToggle = event => {
        event.stopPropagation();
    }

    return (
        <nav 
            className={ `accounts-side-nav-wrapper ${className} y-axis-flex` }
            onClick={checkForToggle}
        >
            { navElems }
            
        </nav>  
    );
}

export default SideNav;