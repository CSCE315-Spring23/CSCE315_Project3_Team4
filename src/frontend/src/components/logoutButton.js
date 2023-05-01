import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./server.css";

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    function logoutUser() {
        console.log("Logout initiated. window.location.origin: %s", window.location.origin);
        logout({ logoutParams: { returnTo: window.location.origin } });
    }


    return (
        <button class={props.class} onClick={() => logoutUser()}>
            Logout
        </button>
    );
};

export default LogoutButton;