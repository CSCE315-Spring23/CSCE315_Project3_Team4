import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SalesReport from "./Sales.jsx";
import XReport from "./XReport.jsx";
import ZReport from "./ZReport.jsx";
import ExcessReport from "./Excess.jsx";
import RestockReport from "./Restock.jsx";
import Inventory from "./Inventory.jsx";
import Menu from "./Menu.jsx";
import ServerView from "../server-pages/Home";

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
                <Route path="/" element={<Navigate to="/Sales_Report" />} />
                <Route path="/Sales_Report" element={<SalesReport />} />
                <Route path="/X_Report" element={<XReport />} />
                <Route path="/Z_Report" element={<ZReport />} />
                <Route path="/Excess_Report" element={<ExcessReport />} />
                <Route path="/Restock_Report" element={<RestockReport />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/MenuItems" element={<Menu />} />
            </Routes>
        </Router>

    );







}

export default Home;