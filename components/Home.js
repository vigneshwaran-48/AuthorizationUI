import React, { useState } from "react";
import "../css/home.css";
import Loading from "../utility/Loading";
import { motion } from "framer-motion";
import { Common } from "../utility/Common";
import useApp from "../AppProvider";
import RequireAuth from "../utility/RequireAuth";
import { UserAPI } from "../api/UserAPI";
import { useLoaderData } from "react-router";

export const homeLoader = async ({ params }) => {
    await RequireAuth();
    return UserAPI.getCurrentUserDetails();
}
const Home = () => {

    // const app = useApp();
    
    const loaderData = useLoaderData();
    console.log(loaderData);

    if(!loaderData) {
        return <Loading />
    }
    
    return (
        <motion.div 
            className="home y-axis-flex"
            initial={ Common.mainElementsFramerVariants.slideFromRight }
            animate={ Common.mainElementsFramerVariants.stay }
            exit={ Common.mainElementsFramerVariants.exit }
            transition={ Common.mainElementsFramerVariants.elemTransition }
        >
            <h1>Home</h1>
            <div className="user-welcome-div y-axis-flex">
                <img 
                    src={ loaderData.user.profileImage }
                    alt="user"
                    className="home-user-image"
                />
                <p>Welcome, { loaderData.user.userName }</p>
            </div>
            <div className="accounts-info-wrapper x-axis-flex">
                <div className="accounts-info-box personal-info-details y-axis-flex">
                    <h2>Personal Info</h2>
                    <p>Hi this is personal info detail</p>
                </div>
                <div className="accounts-info-box personal-info-details y-axis-flex">
                    <h2>Personal Info</h2>
                    <p>Hi this is personal info detail</p>
                </div>
                <div className="accounts-info-box personal-info-details y-axis-flex">
                    <h2>Personal Info</h2>
                    <p>Hi this is personal info detail</p>
                </div>  
            </div>
        </motion.div>
    )
}

export default Home;