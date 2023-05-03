import React, { useEffect, useState } from "react";
import "../components/server.css"
import Employee from "../components/serverEmployee"
import NavBar from "../components/managerNavBar"
import ServerView from "../server-pages/Home"
import SalesReport from "../components/salesReport"
import Menu from "../components/Menu"
import Restock from "./Restock"
import XReport from "./XReport"
import ZReport from "./ZReport"
import Excess from "./Excess"
import Inventory from "./Inventory"
import axios from "axios"


function Home() {

    const [view, setView] = useState(0);
    const [serverView, setServerView] = useState(false);

    function handleServerView() {
        setServerView(true);
    };

    function handleView(view) {
        setView(view);
    };


    return (
        <div>
            {!serverView && <div className="backsplash">

                <header>
                    <NavBar server={handleServerView} view={handleView} />
                </header>
                <main>
                    <Employee />
                    {view == 0 && <SalesReport />}
                    {view == 1 && <XReport />}
                    {view == 2 && <ZReport />}
                    {view == 3 && <Excess />}
                    {view == 4 && <Restock />}
                    {view == 5 && <Inventory />}
                    {view == 6 && <Menu />}

                </main>

            </div>}

            {serverView && <ServerView userClass={1} />}
        </div>

    )







}

export default Home;