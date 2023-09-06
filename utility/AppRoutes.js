export const RoutesManager = {

    loginPage: "/oauth",
    signUpPage: "/oauth/sign-up",
    home: "/",
}

let appRoutes = {};

export const ServerAPIManager = {
    routes: {},
    userAPI: "/api/user",
    userInfoAPI: "/api/user/me",
    clientAPI: userId => {
        return `/api/user/${userId}/client`
    },
    populateRoutes: routes => {
        appRoutes = routes;
    },
    getAppRoutes: async () => {
        if(!appRoutes.client) {

            const response = await fetch("/api/utility/get-routes");
            const data = await response.json();
            appRoutes = data;
        }
        return appRoutes;
    }
}