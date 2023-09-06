import { AppActionTypes } from "../utility/ReducerActionTypes";
import { ThemeConstants } from "../utility/ThemeConstants";

export const appReducerInitialState = {
    routes: {},
    preferences: {
        theme: ThemeConstants.LIGHT_THEME
    }
}

export const appReducerFetchAndInit = initState => {

    
    return initState;
}

export const appReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case AppActionTypes.LOGOUT:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false
                }
            }
        case AppActionTypes.POPULATE_ROUTES:
            return {
                ...state,
                routes: payload.routes
            }
        case AppActionTypes.CHANGE_THEME:
            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    theme: payload.preferences.theme
                }
            }
        default:
            throw new Error("Unknown type is passed to appReducer");
    }
}