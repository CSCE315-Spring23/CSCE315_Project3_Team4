import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import Employee from '../components/serverEmployee'
import CurrentOrder from "./CurrentOrder"
import "../components/server.css"
import axios from "axios"

function Combos() {

    const [combos, setCombos] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);

    useEffect(() => {
        fetchCombos();
    }, [])

    const fetchCombos = async () => {
        const response = await axios.get("http://localhost:8000/menuItems/?class=1");
        setCombos(response.data);
    }

    useEffect(() => {
        console.log(combos);
    }, [combos])

    const handleItemClick = (item) => {
        setCurrentOrder([...currentOrder, item]);
    };

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

                <div className="POS-container">
                    <div className="Menu-grid">
                        {combos.map(combo => (
                            <div key={combo.menuitemid} className="MenuItem-block">

                                <button className="Item-Button"
                                    onClick={() => handleItemClick(combo)}>{combo.name}
                                </button>

                                <p className="Item-Price">${combo.menuprice.toFixed(2)}</p>

                            </div>

                        ))}

                    </div>

                </div>
            </main>

        </div>
    );
}


export default Combos