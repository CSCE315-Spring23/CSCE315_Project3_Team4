import './server.css'

import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import WeatherWidget from '../components/weatherWidget'

import logo from './revsLogo.png'

/**
 * A navigation bar component that displays buttons for navigating to different
 * categories of items in a restaurant menu and for accessing the order view.
 * @function customerNavBar
 * @param {Object} props - The props object containing the functions for
 *     changing the menu category and for accessing the order view.
 * @param {function} props.change - A function that changes the current menu
 *     category.
 * @param {function} props.orderView - A function that displays the order view.
 * @returns {JSX.Element} A JSX element that displays a navigation bar with
 *     buttons for navigating to different categories of items in a restaurant
 *     menu and for accessing the order view.
 */
function customerNavBar({change, orderView}) {
  return (
    <>
      <Navbar className='nav'>
        <WeatherWidget/>
        <Container>
          
          <Navbar.Brand>
            <img className='nav-logo' src={
    logo} />
          </Navbar.Brand>
          <button class='nav-button' onClick={() => change(1)} >Combos</button>
          <button class="nav-button" onClick={() => change(2)} >Entrees</button>
          <button class='nav-button' onClick={() => change(3)} >Drinks</button>
          <button class="nav-button" onClick={() => change(4)} >Sweets</button>
          <button class='nav-button' onClick={() => change(5)} >Sides</button>
          <button class="nav-button" onClick={() => orderView()} >Order</button>
        </Container>
      </Navbar>
    </>
  );
}

export default customerNavBar;