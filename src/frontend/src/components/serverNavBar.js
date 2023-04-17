import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import "./server.css"
import logo from "./revsLogo.png"
import LogoutButton from "./logoutButton"

function NavBar() {
  return (
    <>
      <Navbar className="nav">
        <Container>
          <Navbar.Brand>
            <img className="nav-logo" src={logo} />
          </Navbar.Brand>
          <Nav.Link className="nav-button" href="Combos">Combos</Nav.Link>
          <Nav.Link className="nav-button" href="Entrees">Entrees</Nav.Link>
          <Nav.Link className="nav-button" href="Drinks">Drinks</Nav.Link>
          <Nav.Link className="nav-button" href="Sweets">Sweets</Nav.Link>
          <Nav.Link className="nav-button" href="Sides">Sides</Nav.Link>
          <Nav.Link className="nav-button" href="CurrentOrder">Order</Nav.Link>
          <LogoutButton class="nav-button" />
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;