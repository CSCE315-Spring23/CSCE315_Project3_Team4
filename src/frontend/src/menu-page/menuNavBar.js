import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react'
import "../components/server.css"
import logo from "../components/revsLogo.png"
import WeatherWidget from '../components/weatherWidget';

function menuNavBar({ change, view }) {



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
          <button class="nav-button-accent" onClick={() => view()}> Back</button>
          
        </Container>
      </Navbar>
    </>
  );
}

export default menuNavBar;