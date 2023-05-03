import React from 'react'
import "./Home.css"
import logo from "./components/revsLogo.png"
import LoginButton from "./components/loginButton.js";
import WeatherWidget from './components/weatherWidget';

/**
 * @function Login
 * @description Renders the Login component with a logo, login button, menu board button, and weather widget.
 * @returns {JSX.Element} A div with the 'frame' id containing a logo, login button, menu board button, and weather widget.
 */
function Login() {
  return (
    <div id="frame">
      <img id="logo" src={logo} />
      <LoginButton class="option"> Login</LoginButton>
      <button className="option"> Menu Board</button>
      <WeatherWidget/>
    </div>
  )
}

export default Login