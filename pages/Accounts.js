import React, { useEffect, useState } from "react";
import { Common } from "../utility/Common";
import "../css/accounts.css";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router";


export const accountsLoader = async ({ params }) => {
    
    return Common.IGNORE_ACTION;
}
const Accounts = () => {

    const [ isSideNavOpen, setIsSideNavOpen ] = useState(false);

    const toggleNavBar = event => {
        event.stopPropagation();
        setIsSideNavOpen(prevIsSideNavOpen => !prevIsSideNavOpen);
    }

    useEffect(() => {
        Common.addCloseOnFocusOutElems("accounts-side-nav-id", () => {
            setIsSideNavOpen(false);
        }, [ "accounts-header-app-icon-id" ]);

    }, []);
    
    return (
        <div className="accounts y-axis-flex">
            <div className="popup error-popup x-axis-flex">
                <i className="bi bi-x-circle-fill"></i>
                <div className="popup-message">
                    <p className="error-popup-para">Error message dddddddddd</p>
                </div>
                <i 
                    className="bi bi-x" 
                    id="popup-close-button"
                    onClick={ () => Common.closeErrorPopupForce() }
                ></i>
            </div>
            <div className="popup success-popup x-axis-flex">
                <i className="fa fa-solid fa-check"></i>
                <div className="popup-message">
                    <p className="success-popup-para">Success message dddddddddd</p>
                </div>
                <i 
                    className="bi bi-x" 
                    id="popup-close-button"
                    onClick={ () => Common.closeSuccessPopupForce() }
                ></i>
            </div>
            <header className="accounts-header x-axis-flex">
                <img 
                    src={ Common.appIcon } 
                    alt="app-icon" 
                    className="accounts-header-app-icon"
                    id="accounts-header-app-icon-id"
                    onClick={ toggleNavBar }
                />
                <h2>{ Common.appName }</h2>
            </header>
            <div className="accounts-bottom x-axis-flex">
                <SideNav className={
                        isSideNavOpen ? "open-accounts-side-nav": ""
                    } 
                />
                <div className="accounts-main-body">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Accounts;