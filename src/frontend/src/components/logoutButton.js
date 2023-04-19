import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (props) => {
    const { logout } = useAuth0();

    return (
        <button class={props.class} onClick={() => logout({ logoutParams: { returnTo: window.location.assign("http://localhost:3000/") } })}>
            Log Out
        </button>
    );
};

export default LogoutButton;