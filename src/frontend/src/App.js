import React, { useEffect } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./Home";
import ServerView from "./server-pages/Home";
import ManagerView from "./manager-pages/Home";

function App() {

    const { isLoading, isAuthenticated, error, user, logout } = useAuth0();
    localStorage.setItem('user', JSON.stringify(user));

    if (isLoading) { return <h1>Loading...</h1> }

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        console.log(user);
        console.log("%s with ClassID: %s, is authenticated", user.name, user.user_metadata.employeeClass);
        switch (user.user_metadata.employeeClass) {
            case '0': // Employee/Server
                return (<ServerView />);
            case '1': // Manager
                return (<ManagerView />);
            // case '2': // Customer (Kiosk)
            //     return (<CustomerView />);
            default:
                console.log("User class is not recognized. User logged out.");
                logout({ logoutParams: { returnTo: window.location.assign(window.location.origin) } });
                return (<Landing />);
                break;
        }

    } else {
        return <Landing />;
    }
}

export default App;
