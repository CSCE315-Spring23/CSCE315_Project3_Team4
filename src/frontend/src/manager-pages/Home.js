import React, { useEffect, useState } from "react";
import "../components/server.css"
import Employee from "../components/serverEmployee"
import NavBar from "../components/managerNavBar"
import ServerView from "../server-pages/Home"
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
                    {view == 0 && <div>
                        <div class="manager-tab-functions">
                            <button> funtion 1</button>
                            <button> funtion 2</button>
                        </div>
                        <div className='POS-container'>

                        </div>
                    </div>}
                    {view == 1 && <div className="Content">

                    </div>}
                    {view == 2 && <div className="Content">

                    </div>}
                    {view == 3 && <div className="Content">

                    </div>}
                    {view == 4 && <div className="Content">

                    </div>}
                    {view == 5 && <div className="Content">

                    </div>}
                    {view == 6 && <div className="Content">

                    </div>}
                    {view == 7 && <div className="Content">

                    </div>}

                </main>

            </div>}

            {serverView && <ServerView userClass={1} />}
        </div>

    )







}

export default Home;