import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    console.log("Logout initiated. window.location.origin: %s", window.location.origin);

    return (
        <button class={props.class} onClick={() => logout({ logoutParams: { returnTo: window.location.assign(window.location.origin) } })}>
            Log Out
        </button>
    );
};

export default LogoutButton;