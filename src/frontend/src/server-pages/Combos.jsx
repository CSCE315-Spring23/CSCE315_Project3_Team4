import React, { useEffect, useState } from 'react'
import NavBar from '../components/serverNavBar'
import "../components/navBar.css"
import axios from "axios"

function Combos() {

    const [combos, setCombos] = useState([]);

    useEffect(() => {
        fetchCombos();
    }, [])

    const fetchCombos = async () => {
        const response = await axios.get("http://localhost:3000/menuItems/?class=1");
        setCombos(response.data);
    }

    useEffect(() => {
        console.log(combos);
    }, [combos])

    return (
        <div className="backsplash">
            <header>
                <NavBar />
            </header>
            <main>

            </main>
        </div>


    )
}

export default Combos