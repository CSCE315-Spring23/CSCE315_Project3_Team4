import React from 'react'
import "./Home.css"
import logo from "./components/revsLogo.png"
import LoginButton from "./components/loginButton.js";


function Login() {
  return (
    <div id="frame">
      <img id="logo" src={logo} />
      <LoginButton class="option"> Login</LoginButton>
      <button className="option"> Menu Board (currently not functional)</button>
    </div>
  )
}

export default Login