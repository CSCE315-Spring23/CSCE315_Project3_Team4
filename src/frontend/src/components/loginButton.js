import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const loginButton = (props) => {
    const { loginWithRedirect } = useAuth0();

    return <button class={props.class}
        onClick={() => loginWithRedirect({
            appState: {
                redirectTo: window.location.pathname
            }
        })
        }> Log In</button >;
};

export default loginButton;