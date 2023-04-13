import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Combos from "./server-pages/Combos";
import Entrees from "./server-pages/Entrees";
import Drinks from "./server-pages/Drinks";
import Sweets from "./server-pages/Sweets";
import Sides from "./server-pages/Sides";
import CurrentOrder from "./server-pages/CurrentOrder";
import LoginButton from "./loginButton.js";
import LogoutButton from "./logoutButton.js";

import {
    BrowserRouter as
    Router,
    Routes,
    Route,

} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/Combos" element = { <Combos/> } />
                <Route path = "/Entrees" element = { <Entrees/> } />
                <Route path = "/Drinks" element = { <Drinks/> } />
                <Route path = "/Sweets" element = { <Sweets/> } />
                <Route path = "/Sides" element = { <Sides/> } />
                <Route path = "/CurrentOrder" element = { <CurrentOrder/> } />
            </Routes>
        </Router>
            
    );
}

export default App;
