import React, { useEffect, useState } from "react";
import "../components/server.css"
import Employee from "../components/serverEmployee"
import NavBar from "../components/serverNavBar"
import axios from "axios"

function Home() {

    const [items, setItems] = useState([]);
    const [orderView, setOrderView] = useState(false);
    var [currItemClass, setCurrItemClass] = useState(1);
    const [currentOrder, setCurrentOrder] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = async () => {
        const response = await axios.get("http://localhost:8000/menuItems/?class=" + currItemClass);
        setItems(response.data);
        setOrderView(false);
    }

    useEffect(() => {
        console.log(items);
    }, [items])

    const handleItemClick = (item) => {
        setCurrentOrder([...currentOrder, item]);
    };

    useEffect(() => {
        console.log(currentOrder);
    }, [currentOrder])

    function handleCurrItemClass(newClass) {
        setCurrItemClass(newClass);
    }

    useEffect(() => {
        fetchItems();
        console.log("New Item Class Selected: %s", currItemClass);
    }, [currItemClass])

    function handleOrderView() {
        setOrderView(true);
    };

    return (
        <div className="backsplash">

            <header>
                <NavBar change={handleCurrItemClass} orderView={handleOrderView} />
            </header>
            <main>
                <Employee />
                {!orderView && <div className="POS-container">
                    <div className="Menu-grid">
                        {items.map(item => (
                            <div key={item.menuitemid} className="MenuItem-block">
                                <button className="Item-Button"
                                    onClick={() => handleItemClick(item)}>{item.name}
                                </button>

                                <p className="Item-Price">${item.menuprice.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>}

                {orderView && <div className="POS-container">
                    <div className="Menu-grid">
                        {currentOrder && currentOrder.map((item) => (
                            <div key={item.menuitemid} className="MenuItem-block">
                                <p>{item.name}</p>
                                <p>${item.menuprice.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>}
            </main>

        </div>
    )

}


export default Home;