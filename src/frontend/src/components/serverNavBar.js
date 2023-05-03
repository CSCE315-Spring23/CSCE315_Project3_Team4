import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import "./server.css"
import logo from "./revsLogo.png"
import LogoutButton from "./logoutButton"
import WeatherWidget from './weatherWidget';

/**
 * @function serverNavBar
 * @description Renders a navigation bar with menu categories, order view, and optional manager view.
 * @param {Object} props - The properties passed to the component.
 * @param {function(number): void} props.change - Callback function to change the menu category.
 * @param {function(): void} props.orderView - Callback function to display the order view.
 * @param {boolean} props.isManager - Indicates if the user is a manager.
 * @param {function(): void} [props.managerView] - Optional callback function to display the manager view if the user is a manager.
 * @returns {JSX.Element} A React fragment containing a navigation bar with menu categories, order view, and optional manager view.
 */
function serverNavBar({ change, orderView, isManager, managerView }) {
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
          {isManager && <button class="nav-button" onClick={() => managerView()} >Manager</button>}
          <LogoutButton class="nav-button-accent" />
          
        </Container>
      </Navbar>
    </>
  );
}

export default serverNavBar;