import './server.css'

import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LogoutButton from './logoutButton'
import logo from './revsLogo.png'
import WeatherWidget from './weatherWidget';

/**
 * Renders a navigation bar component with buttons for navigating between
 * different views.
 *
 * @param {Object} props - The component props.
 * @param {function} props.server - A function for handling the POS button click
 *     event.
 * @param {function} props.view - A function for handling the button click
 *     events for navigating to different views.
 * @returns {JSX.Element} The navigation bar component.
 */
function NavBar({server, view}) {
  return (
    <>
      <Navbar className='nav'>
      <WeatherWidget/>
        <Container>
          <Navbar.Brand>
            <img className='nav-logo' src={
    logo} />
          </Navbar.Brand>
          <button class='nav-button' onClick={() => view(0)} >Sales</button>
          <button class="nav-button" onClick={() => view(1)} >X Report</button>
          <button class='nav-button' onClick={() => view(2)} >Z Report</button>
          <button class="nav-button" onClick={() => view(3)} >Excess</button>
          <button class='nav-button' onClick={() => view(4)} >Restock</button>
          <button class="nav-button" onClick={() => view(5)} >Inventory</button>
          <button class='nav-button' onClick={() => view(6)} >Menu</button>
          <button class="nav-button" onClick={() => server()} >POS</button>
          <LogoutButton class='nav-button-accent' />
        </Container>
      </Navbar>
    </>
  );

}

export default NavBar;