import React, { useEffect }  from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from "react-router-dom";

import "./css/index.css";

import 'font-awesome/css/font-awesome.min.css';

import { Common } from "./utility/Common";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  Accounts, { accountsLoader }  from "./pages/Accounts";
import Home, { homeLoader } from "./components/Home";
import PersonalInfo, { 
    personalInfoAction,
    personalInfoLoader }  
from "./components/PersonalInfo";
import DeveloperConsole, { developerLoaderData }  from "./components/DeveloperConsole";
import ListApps, { listAppsAction, listAppsLoader }  from "./components/developer-console/ListApps";
import CreateApp, { createAppAction }  from "./components/developer-console/CreateApp.js";
import { AppProvider } from "./AppProvider";
import ClientAppSingleView, { clientAppSingleViewAction, clientAppSingleViewLoader } from "./components/developer-console/ClientAppSingleView";
import Loading from "./utility/Loading";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route 
            path="/" 
            element={<Accounts />}
            loader={accountsLoader}
        >
            <Route 
                index 
                element={<Home />} 
                loader={homeLoader}        
            />
            <Route
                path="personal-info" 
                element={<PersonalInfo />}
                loader={personalInfoLoader}
                action={personalInfoAction}
            />
            <Route 
                path="developer-console" 
                element={<DeveloperConsole />}
                loader={developerLoaderData}
            >
                <Route index element={<Navigate to="list" />} />
                <Route 
                    path="list" 
                    element={<ListApps />}
                    loader={listAppsLoader}
                    action={listAppsAction}
                />
                <Route 
                    path="list/:id" 
                    element={<ClientAppSingleView />}
                    loader={clientAppSingleViewLoader}
                    action={clientAppSingleViewAction}
                />
                <Route 
                    path="create" 
                    element={<CreateApp />}
                    action={createAppAction}
                />
            </Route>
        </Route>
    )
)

const App = () => {

    useEffect(() => {
        window.addEventListener("click", event => {
            const { id } = event.target;
            Common.getCloseOnFocusOutElems().forEach(elem => {
                if(id !== elem.id) {
                    if(!elem.additionalCheckElems || !elem.additionalCheckElems.includes(id)) {
                        elem.closeElem();
                    }
                }
            });
        }, false)
    }, []);

    return (
        <AppProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <React.Suspense fallback={<Loading />}>
                    <RouterProvider router={route} />
                </React.Suspense>
            </LocalizationProvider>
        </AppProvider>
    );
}

export default App;