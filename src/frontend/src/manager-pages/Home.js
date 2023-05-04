import '../components/server.css'

import axios from 'axios'
import React, {useEffect, useState} from 'react';

import NavBar from '../components/managerNavBar'
import Menu from '../components/Menu'
import SalesReport from '../components/salesReport'
import Employee from '../components/serverEmployee'
import ServerView from '../server-pages/Home'

import Excess from './Excess'
import Inventory from './Inventory'
import Restock from './Restock'
import XReport from './XReport'
import ZReport from './ZReport'

/**
 * @function Home
 * @description Renders the Home component with navigation bar, employee, and
 * various report components based on the selected view.
 * @returns {JSX.Element} A div containing a navigation bar, employee, and
 *     various report components based on the selected view.
 */
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
            {!serverView && <div className='backsplash'>

                <header>
                    <NavBar server={handleServerView} view={
    handleView} />
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