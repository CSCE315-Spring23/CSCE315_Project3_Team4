import React from "react";
import "./App.css";
import Landing from "./Home";
import Combos from "./server-pages/Combos";
import Entrees from "./server-pages/Entrees";
import Drinks from "./server-pages/Drinks";
import Sweets from "./server-pages/Sweets";
import Sides from "./server-pages/Sides";
import CurrentOrder from "./server-pages/CurrentOrder";

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
                <Route path="/" element={<Landing />} />
                <Route path="/Combos" element={<Combos />} />
                <Route path="/Entrees" element={<Entrees />} />
                <Route path="/Drinks" element={<Drinks />} />
                <Route path="/Sweets" element={<Sweets />} />
                <Route path="/Sides" element={<Sides />} />
                <Route path="/CurrentOrder" element={<CurrentOrder />} />
            </Routes>
        </Router>
    );
}

export default App;
