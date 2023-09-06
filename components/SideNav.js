import React from "react";
import { Common } from "../utility/Common";
import { NavLink } from "react-router-dom";

const SideNav = ({ className }) => {
    
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