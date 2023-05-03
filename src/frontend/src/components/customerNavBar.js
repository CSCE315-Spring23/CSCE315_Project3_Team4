import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import WeatherWidget from "../components/weatherWidget"
import "./server.css"
import logo from "./revsLogo.png"

function customerNavBar({ change, orderView }) {

  // const [itemClass, setItemClass] = useState(1);

  // useEffect(() => {

  // })

  return (
    <>
      <Navbar className="nav">
        <WeatherWidget/>
        <Container>
          
          <Navbar.Brand>
            <img className="nav-logo" src={logo} />
          </Navbar.Brand>
          <button class="nav-button" onClick={() => change(1)} >Combos</button>
          <button class="nav-button" onClick={() => change(2)} >Entrees</button>
          <button class="nav-button" onClick={() => change(3)} >Drinks</button>
          <button class="nav-button" onClick={() => change(4)} >Sweets</button>
          <button class="nav-button" onClick={() => change(5)} >Sides</button>
          <button class="nav-button" onClick={() => orderView()} >Order</button>
        </Container>
      </Navbar>
    </>
  );
}

export default customerNavBar;