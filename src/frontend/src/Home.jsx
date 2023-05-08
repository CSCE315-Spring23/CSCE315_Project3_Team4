import React, {useState} from 'react'
import "./Home.css"
import logo from "./components/revsLogo.png"
import LoginButton from "./components/loginButton.js";
import WeatherWidget from './components/weatherWidget';
import MenuBoard from "./menu-page/Home"

function Login() {

  const [menuView, setMenuView] = useState(false);

  function handleMenuView() {
        setMenuView(!menuView);
  }

  return (
  <>
    {!menuView && 
      <div id="frame">
        <img id="logo" src={logo} />
        <LoginButton class="option"> Login</LoginButton>
        <button className="option" onClick = {handleMenuView}> Menu Board </button>
        <WeatherWidget/>
      </div>
    }

    {menuView && <MenuBoard menuView={handleMenuView}/>

    }
  </>
  )
}

export default Login