import './server.css';

import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

/**
 * A logout button component that allows a user to log out and redirect to the
 * home page using the Auth0 authentication service.
 * @function LogoutButton
 * @param {Object} props - The props object containing the CSS class to apply to
 *     the button.
 * @param {string} props.class - The CSS class to apply to the button.
 * @returns {JSX.Element} A JSX element that displays a button for logging out
 *     using the Auth0 authentication service.
 */
const LogoutButton = (props) => {
    const { logout } = useAuth0();

    function logoutUser() {
        console.log('Logout initiated. window.location.origin: %s', window.location.origin);
        logout({ logoutParams: { returnTo: window.location.origin } });
    }


    return (
        <button class={props.class} onClick={() => logoutUser()}>
            Logout
        </button>
    );
};

export default LogoutButton;