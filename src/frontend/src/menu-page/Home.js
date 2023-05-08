import React, { useEffect, useState } from "react";
import "../components/server.css";
import NavBar from "../menu-page/menuNavBar";
import axios from "axios";

function Home({ menuView }) {
  const [items, setItems] = useState([]);
  var [currItemClass, setCurrItemClass] = useState(1);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(
      "https://revs-grill-backend.onrender.com/menuItems/?class=" +
        currItemClass
    );
    setItems(response.data);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  function handleCurrItemClass(newClass) {
    setCurrItemClass(newClass);
  }

  useEffect(() => {
    fetchItems();
    console.log("New Item Class Selected: %s", currItemClass);
  }, [currItemClass]);

  return (
    <div>
      {
        <div className="backsplash">
          <header>
            <NavBar change={handleCurrItemClass} view={menuView} />
          </header>
          <main>
            {(
              <div className="POS-container">
                <div className="Menu-grid">
                  {items.map((item) => (
                    <div key={item.menuitemid} className="MenuItem-block">
                      <div className="Item-Button" onClick={<></>}>
                        {item.name}
                      </div>

                      <p className="Item-Price">${item.menuprice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      }
    </div>
  );
}

export default Home;
