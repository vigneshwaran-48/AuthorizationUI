import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { appReducer, appReducerInitialState } from "./reducer/appReducer";
import { AppActionTypes } from "./utility/ReducerActionTypes";
import { UserAPI } from "./api/UserAPI";

const AppContext = createContext(appReducerInitialState);

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, appReducerInitialState);

    const profileImageListeners = useRef([]);

    const logout = () => {
        dispatch({ type: AppActionTypes.LOGOUT });
    }
    const changeTheme = theme => {
        dispatch({
            type: AppActionTypes.CHANGE_THEME,
            payload: { theme }
        })
    }

    const listenToProfileImageChange = callback => {
        profileImageListeners.current.push(callback);
    }

    const populateRoutes = routes => {
        dispatch({
            type: AppActionTypes.POPULATE_ROUTES,
            payload: { routes }
        });
    }

    const notifyProfileImageListeners = image => {
        profileImageListeners.current.forEach(callback => callback(image));
    }

    const updateUserImage = image => {
        notifyProfileImageListeners(image);
        dispatch({
            type: AppActionTypes.UPDATE_USER,
            payload: {
                user: {
                    image
                }
            }
        });
    }

    const values = {
        logout,
        changeTheme,
        info: state,
        populateRoutes,
        updateUserImage,
        listenToProfileImageChange
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