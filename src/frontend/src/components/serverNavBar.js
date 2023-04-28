import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import "./server.css"
import logo from "./revsLogo.png"
import LogoutButton from "./logoutButton"

function serverNavBar() {

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
          <button class="nav-button" >Combos</button>
          <Nav.Link className="nav-button" href="Entrees">Entrees</Nav.Link>
          <Nav.Link className="nav-button" href="Drinks">Drinks</Nav.Link>
          <Nav.Link className="nav-button" href="Sweets">Sweets</Nav.Link>
          <Nav.Link className="nav-button" href="Sides">Sides</Nav.Link>
          <Nav.Link className="nav-button" href="CurrentOrder">Order</Nav.Link>
          <LogoutButton className="nav-button" />
        </Container>
      </Navbar>
    </>
  );
}

export default serverNavBar;