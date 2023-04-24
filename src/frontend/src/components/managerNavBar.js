import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import "./navBar.css"
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
          <Nav.Link className="nav-button" href="Sales_Report">Sales</Nav.Link>
          <Nav.Link className="nav-button" href="X_Report">X Reoprt</Nav.Link>
          <Nav.Link className="nav-button" href="Z_Report">Z Report</Nav.Link>
          <Nav.Link className="nav-button" href="Excess_Report">Excess</Nav.Link>
          <Nav.Link className="nav-button" href="Restock_Report">Restock</Nav.Link>
          <Nav.Link className="nav-button" href="Inventory">Inventory</Nav.Link>
          <Nav.Link className="nav-button" href="Menu">Menu</Nav.Link>
          <button class="nav-button" /*onClick=setUserClass(0)*/ >POS</button>
          <LogoutButton class="nav-button" />
        </Container>
      </Navbar>
    </>
  );

}

export default NavBar;