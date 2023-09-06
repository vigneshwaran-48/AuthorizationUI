import Cookies from "js-cookie";
import { ServerAPIManager } from "../utility/AppRoutes";
import { Common } from "../utility/Common";

let isUserLoggedIn = true;

export const UserAPI = {

    csrf: async () => {
        const response = await fetch(Common.appDomain + ServerAPIManager.csrf);
        return response;
    },
    createUser : async userData => {

        const response = await fetch(Common.appDomain + ServerAPIManager.userAPI, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(userData)
                                });
        return response;
    },
    isUserLoggedIn : () => {
        return isUserLoggedIn;
    },
    getCurrentUserDetails: async () => {
        const response = await fetch(Common.appDomain + ServerAPIManager.userInfoAPI);

        return response;
    },
    login: async userData => {

        const response = await fetch(Common.appDomain + ServerAPIManager.userLoginAPI, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(userData)
                                });
        
        return response;

    },
    updateUser: async userData => {

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(Common.appDomain + ServerAPIManager.userAPI, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                    body: JSON.stringify(userData)
                                });
        return response;                           
    },
    uploadImage: async (formData, userId) => {
        
        const url = ServerAPIManager.userAPI + "/" + userId + "/profile-image";

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(Common.appDomain + url, {
                                    method: "PUT",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                    body: formData
                                });
        return response;                        
    }
}