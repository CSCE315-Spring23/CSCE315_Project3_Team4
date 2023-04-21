import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import "../components/server.css"
import axios from "axios"

function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
      fetchDrinks();
  }, [])

  const fetchDrinks = async() => {
      const response = await axios.get("http://localhost:8000/menuItems/?class=3");
      setDrinks(response.data);
  }

  useEffect(() => {
      console.log(drinks);
  }, [drinks])

  return (
      <div className="backsplash">

        <header>
          <NavBar />
        </header>
        
        <main>

          <Employee />

          <div className = "POS-container">
            <div className = "Menu-grid">
              {drinks.map(drinks => (
                <div key = {drinks.menuitemid} className = "MenuItem-block">
                  <button className = "Item-Button">{drinks.name}</button>
                  <p className = "Item-Price">${drinks.menuprice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>
    );
  }

export default Drinks