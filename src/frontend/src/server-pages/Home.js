import React from "react";
import Combos from "./Combos";
import Entrees from "./Entrees";
import Drinks from "./Drinks";
import Sweets from "./Sweets";
import Sides from "./Sides";
import CurrentOrder from "./CurrentOrder";

import {
    BrowserRouter as
        Router,
    Routes,
    Route,
    Navigate

} from "react-router-dom";

function Home() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Combos" />} />
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


export default Home;