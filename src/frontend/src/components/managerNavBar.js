import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import "./server.css"
import logo from "./revsLogo.png"
import LogoutButton from "./logoutButton"
import WeatherWidget from './weatherWidget';

function NavBar({ server, view }) {
  return (
    <>
      <Navbar className="nav">
      <WeatherWidget/>
        <Container>
          <Navbar.Brand>
            <img className="nav-logo" src={logo} />
          </Navbar.Brand>
          <button class="nav-button" onClick={() => view(0)} >Sales</button>
          <button class="nav-button" onClick={() => view(1)} >X Report</button>
          <button class="nav-button" onClick={() => view(2)} >Z Report</button>
          <button class="nav-button" onClick={() => view(3)} >Excess</button>
          <button class="nav-button" onClick={() => view(4)} >Restock</button>
          <button class="nav-button" onClick={() => view(5)} >Inventory</button>
          <button class="nav-button" onClick={() => view(6)} >Menu</button>
          <button class="nav-button" onClick={() => server()} >POS</button>
          <LogoutButton class="nav-button-accent" />
        </Container>
      </Navbar>
    </>
  );

}

export default NavBar;