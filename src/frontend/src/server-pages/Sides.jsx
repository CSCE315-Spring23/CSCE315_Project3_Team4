import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import "../components/server.css"
import axios from "axios"

function Sides() {
  const [sides, setSides] = useState([]);

  useEffect(() => {
      fetchSides();
  }, [])

  const fetchSides = async() => {
      const response = await axios.get("http://localhost:8000/menuItems/?class=5");
      setSides(response.data);
  }

  useEffect(() => {
      console.log(sides);
  }, [sides])

  return (
      <div className="backsplash">

        <header>
          <NavBar />
        </header>
        
        <main>

          <Employee />

          <div className = "POS-container">
            <div className = "Menu-grid">
              {sides.map(sides => (
                <div key = {sides.menuitemid} className = "MenuItem-block">
                  <button className = "Item-Button">{sides.name}</button>
                  <p className = "Item-Price">${sides.menuprice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>
    );
  }


export default Sides