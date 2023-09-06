import React, { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer, appReducerInitialState } from "./reducer/appReducer";
import { AppActionTypes } from "./utility/ReducerActionTypes";
import { UserAPI } from "./api/UserAPI";

const AppContext = createContext(appReducerInitialState);

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, appReducerInitialState);

    const logout = () => {
        dispatch({ type: AppActionTypes.LOGOUT });
    }
    const changeTheme = theme => {
        dispatch({
            type: AppActionTypes.CHANGE_THEME,
            payload: { theme }
        })
    }

    const populateRoutes = routes => {
        dispatch({
            type: AppActionTypes.POPULATE_ROUTES,
            payload: { routes }
        });
    }

    const values = {
        logout,
        changeTheme,
        info: state,
        populateRoutes
    }
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

const useApp = () => {

    const app = useContext(AppContext);

    if(app === undefined) {
        throw new Error("useApp should used within AppProvider");
    }

    return app;
}

export default useApp;