import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import "./server.css"
import logo from "./revsLogo.png"
import LogoutButton from "./logoutButton"

function serverNavBar({ change, orderView, isManager, managerView }) {

  // const [itemClass, setItemClass] = useState(1);

  // useEffect(() => {

  // })

  return (
    <>
      <Navbar className="nav">
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
          {isManager && <button class="nav-button" onClick={() => managerView()} >Manager</button>}
          <LogoutButton className="nav-button" />
        </Container>
      </Navbar>
    </>
  );
}

export default serverNavBar;