import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import "../components/server.css"
import axios from "axios"

function Sweets() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
      fetchSweets();
  }, [])

  const fetchSweets = async() => {
      const response = await axios.get("http://localhost:8000/menuItems/?class=4");
      setSweets(response.data);
  }

  useEffect(() => {
      console.log(sweets);
  }, [sweets])

  return (
      <div className="backsplash">

        <header>
          <NavBar />
        </header>
        
        <main>

          <Employee />

          <div className = "POS-container">
            <div className = "Menu-grid">
              {sweets.map(sweets => (
                <div key = {sweets.menuitemid} className = "MenuItem-block">
                  <button className = "Item-Button">{sweets.name}</button>
                  <p className = "Item-Price">${sweets.menuprice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>
    );
  }

export default Sweets