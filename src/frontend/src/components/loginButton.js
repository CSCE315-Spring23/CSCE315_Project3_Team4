import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

/**
 * A login button component that allows a user to log in by redirecting to an
 * authentication page using the Auth0 authentication service.
 * @function loginButton
 * @param {Object} props - The props object containing the CSS class to apply to
 *     the button.
 * @param {string} props.class - The CSS class to apply to the button.
 * @returns {JSX.Element} A JSX element that displays a button for logging in
 *     using the Auth0 authentication service.
 */
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