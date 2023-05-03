import React from 'react'
import "./Home.css"
import logo from "./components/revsLogo.png"
import LoginButton from "./components/loginButton.js";
import WeatherWidget from './components/weatherWidget';

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