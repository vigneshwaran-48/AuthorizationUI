import React, { useEffect, useRef, useState } from "react";
import { Common } from "../utility/Common";
import "../css/accounts.css";
import SideNav from "../components/SideNav";
import { Outlet, useLoaderData } from "react-router";
import { UserAPI } from "../api/UserAPI";
import useApp from "../AppProvider";


export const accountsLoader = async ({ params }) => {
    return UserAPI.getCurrentUserDetails();
}
const Accounts = () => {

    const [ isSideNavOpen, setIsSideNavOpen ] = useState(false);
    const profileImageTag = useRef();

    const loaderData = useLoaderData();
    const app = useApp();
    
    const toggleNavBar = event => {
        event.stopPropagation();
        setIsSideNavOpen(prevIsSideNavOpen => !prevIsSideNavOpen);
    }

    const handleProfileImageChange = image => {
        profileImageTag.current.src = image;
    }

    useEffect(() => {
        Common.addCloseOnFocusOutElems("accounts-side-nav-id", () => {
            setIsSideNavOpen(false);
        }, [ "accounts-header-app-icon-id" ]);

        app.listenToProfileImageChange(handleProfileImageChange);
        
    }, []);

    if(loaderData?.user && app.info.user.image === "/person.png") {
        app.updateUserImage(loaderData.user.profileImage);
    }
    
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
                <div className="top-user-image-container x-axis-flex">
                    <img 
                        src={ app.info.user.image } 
                        ref={profileImageTag}
                        className="top-user-image"
                        alt="user" />
                </div>
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