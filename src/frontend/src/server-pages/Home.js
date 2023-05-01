import React, { useEffect, useState } from "react";
import "../components/server.css"
import Employee from "../components/serverEmployee"
import tempLogo from "../components/revsLogo.png"
import NavBar from "../components/serverNavBar"
import axios from "axios"
import ManagerView from '../manager-pages/Home'

function Home({ userClass }) {

    const [items, setItems] = useState([]);
    const [orderView, setOrderView] = useState(false);
    var [currItemClass, setCurrItemClass] = useState(1);
    const [managerView, setManagerView] = useState(false);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems =
        async () => {
            const response = await axios.get(
                'https://revs-grill-backend.onrender.com/menuItems/?class=' +
                currItemClass);
            setItems(response.data);
            setOrderView(false);
        }

    useEffect(() => {
        console.log(items);
    }, [items])

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
        fetchItems();
        console.log('New Item Class Selected: %s', currItemClass);
    }, [currItemClass])

    function handleOrderView() {
        const total = currentOrder.reduce((acc, item) => acc + item.menuprice, 0);
        setOrderView(true);
        setGrandTotal(total);
    };

    function handleManagerView() {
        if (userClass == 1) {
            setManagerView(true);
        } else {
            console.log(
                'Unauthorized attepmt to access manager view. UserClass = ',
                userClass);
        }
    };

    return (
        <div>
            {!managerView && <div className='backsplash'>

                <header>
                    <NavBar change={handleCurrItemClass} orderView={handleOrderView} isManager={userClass == 1} managerView={
                        handleManagerView} />
                </header>
                <main>
                    <Employee />
                    {!orderView && <div className='POS-container'>
                        <div className='Menu-grid'>
                            {items.map(item => (
                                <div key={item.menuitemid} className='MenuItem-block'>
                                    <button className='Item-Button'
                                        onClick={() => handleItemClick(item)}>{item.name}
                                    </button>

                                    <p className="Item-Price">${item.menuprice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {orderView && (
                        <div className="Order-container">
                            <div className="Order-block">
                                <div className="Invoice-Title">Your Order</div>
                                <div>
                                    {currentOrder &&
                                        currentOrder.map((item) => (
                                            <div key={item.menuitemid} className="Invoice-Image-Readjust">
                                                <div className="Invoice-Item-Image"> <img src={tempLogo} alt={item.name} className="Invoice-Image-Readjust" /> </div>
                                                <div className="Invoice-Item-Name">{item.name}</div>
                                                <div className="Invoice-Item-Price"> ${item.menuprice.toFixed(2)} </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="GrandTotal-box"> Grand Total: ${grandTotal.toFixed(2)} </div>
                        </div>
                    )}

                </main>

            </div>}
            {managerView && <ManagerView />}
        </div>
    )
}

export default Home;
