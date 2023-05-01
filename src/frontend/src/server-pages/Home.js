import '../components/server.css'

import axios from 'axios'
import React, {useEffect, useState} from 'react';

import Employee from '../components/serverEmployee'
import NavBar from '../components/serverNavBar'
import ManagerView from '../manager-pages/Home'

function Home({userClass}) {
  const [items, setItems] = useState([]);
  const [orderView, setOrderView] = useState(false);
  const [managerView, setManagerView] = useState(false);
  var [currItemClass, setCurrItemClass] = useState(1);
  const [currentOrder, setCurrentOrder] = useState([]);

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
    setOrderView(true);
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

                    {orderView && <div className="POS-container">
                        <div className="Menu-grid">
                            {currentOrder && currentOrder.map((item) => (
                                <div key={item.menuitemid} className="MenuItem-block">
                                    <p className="Item-Button">{item.name}</p>
                                    <p className='Item-Price'>${item.menuprice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>}
                </main>

            </div>}
            {managerView && <ManagerView />}
        </div>
    )

}


export default Home;