import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import "../components/server.css"


function CurrentOrder({ currentOrder }) {

    useEffect(() => {
      console.log(currentOrder);
  }, [currentOrder])

  return (
    <div className="backsplash">
      <header>
        <NavBar />
      </header>

      <main>
        <Employee />
        
        <div className="Menu-grid">
          {currentOrder && currentOrder.map((item) => (
            <div key={item.menuitemid} className="MenuItem-block">
              <p>{item.name}</p>
              <p>${item.menuprice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CurrentOrder;