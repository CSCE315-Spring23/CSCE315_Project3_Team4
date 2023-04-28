import React, { useEffect, useState } from "react";
import Combos from "./Combos";
import Entrees from "./Entrees";
import Drinks from "./Drinks";
import Sweets from "./Sweets";
import Sides from "./Sides";
import CurrentOrder from "./CurrentOrder";
import "../components/server.css"
import Employee from "../components/serverEmployee"
import NavBar from "../components/serverNavBar"
import axios from "axios"

import {
    BrowserRouter as
        Router,
    Routes,
    Route,
    Navigate

} from "react-router-dom";

function Home() {

    const [combos, setCombos] = useState([]);
    const [entrees, setEntrees] = useState([]);
    // const [, setCombos] = useState([]);
    // const [combos, setCombos] = useState([]);
    // const [combos, setCombos] = useState([]);
    // const [combos, setCombos] = useState([]);
    // const [combos, setCombos] = useState([]);
    var [currItemClass, setCurrItemClass] = useState(1);

    const [currentOrder, setCurrentOrder] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = async () => {
        const resp_com = await axios.get("http://localhost:8000/menuItems/?class=1");
        setCombos(resp_com.data);
        const resp_ent = await axios.get("http://localhost:8000/menuItems/?class=2");
        setEntrees(resp_ent.data);
    }

    useEffect(() => {
        console.log(combos);
    }, [combos])

    useEffect(() => {
        console.log(entrees);
    }, [entrees])

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
        console.log("New Item Class Selected: %s", currItemClass);
    }, [currItemClass])


    return (
        <div className="backsplash">

            <header>
                <NavBar change={handleCurrItemClass} />
            </header>
            <main>
                <Employee />

            </main>

        </div>
    )

}


export default Home;