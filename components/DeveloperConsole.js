import React, { useEffect } from "react";
import "../css/developer-console.css";
import { NavLink, Outlet, json, useLoaderData, useLocation, useParams } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { Common } from "../utility/Common";
import RequireAuth from "../utility/RequireAuth";
import Loading from "../utility/Loading";

const navClass = "developer-console-nav-child";
const navActiveClass = "active-developer-console-nav-child";

export const developerLoaderData = async ({ params }) => {
    await RequireAuth();
    return json({
        response: "ok"
    });
}

const DeveloperConsole = () => {

    const params = useParams();
    const location = useLocation();
    const loaderData = useLoaderData();

    useEffect(() => {
        console.log(params);
    }, []);

    if(!loaderData) {
        return <Loading />
    }

    const navElems = Common.developerConsoleTopNav.map(nav => {
        return (
            <NavLink 
                key={ nav.id }
                to={ nav.link }
                className={({ isActive }) => {
                    return isActive ? `${navClass} ${navActiveClass}`
                                    : `${navClass}`
                }}
            ><p>{ nav.name }</p></NavLink>
        )
    })

    return (
        <motion.div 
            initial={ Common.mainElementsFramerVariants.slideFromRight }
            animate={ Common.mainElementsFramerVariants.stay }
            exit={ Common.mainElementsFramerVariants.exit }
            transition={ Common.mainElementsFramerVariants.elemTransition }
            className="developer-console y-axis-flex"
            
        >
            <h1>Developer Console</h1>

            <div className="developer-console-page y-axis-flex">
                <nav className="developer-console-nav x-axis-flex">
                    { navElems } 
                </nav>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{duration: 0.5, ease: easeInOut}}
                    className="animation-wrapper-div"
            >
                    <Outlet />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default DeveloperConsole;