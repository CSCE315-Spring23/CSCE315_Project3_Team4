import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import "../components/server.css"
import axios from "axios"

function Entrees() {
  const [entree, setEntree] = useState([]);

  useEffect(() => {
      fetchEntree();
  }, [])

  const fetchEntree = async() => {
      const response = await axios.get("http://localhost:8000/menuItems/?class=2");
      setEntree(response.data);
  }

  useEffect(() => {
      console.log(entree);
  }, [entree])

  return (
      <div className="backsplash">

        <header>
          <NavBar />
        </header>
        
        <main>

          <Employee />

          <div className = "POS-container">
            <div className = "Menu-grid">
              {entree.map(entree => (
                <div key = {entree.menuitemid} className = "MenuItem-block">
                  <button className = "Item-Button">{entree.name}</button>
                  <p className = "Item-Price">${entree.menuprice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>
    );
  }
export default Entrees