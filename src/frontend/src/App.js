import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./Home";
import ServerView from "./server-pages/Home";
import ManagerView from "./manager-pages/Home";


function App() {

    const { isLoading, isAuthenticated, error, user, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        console.log("%s is Authenticated", user.name);
        var userClass = 1; //getUserClass( user name )
        switch (userClass) {
            case 0: // Employee/Server
                return (<ServerView />);
            case 1: // Manager
                return (<ManagerView />);
            // case 2: // Customer (Kiosk)
            //     return (<CustomerView />);
            default:
                console.log("User class %d is not recognized", userClass);
                logout({ logoutParams: { returnTo: window.location.assign("http://localhost:3000/") } });
                return (<Landing />);
                break;
        }

    } else {
        return <Landing />;
    }







}

export default App;
