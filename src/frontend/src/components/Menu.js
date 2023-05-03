import React, { useEffect, useState } from "react";
import "../components/server.css"
import CurrencyInput from 'react-currency-input-field'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'menuitemid', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Item Name', width: 500 },
    { field: 'menuprice', headerName: 'Price', width: 200 },
    { field: 'classid', headerName: 'Item Type', width: 100 }
]

function Menu() {

    const [tableData, setTableData] = useState([]);
    const [newPrice, setNewPrice] = useState([]);
    const [selectedID, setSelectedID] = useState([]);

    useEffect(() => {
        console.log(selectedID);
    }, [selectedID])

    useEffect(() => {
        console.log(newPrice);
    }, [newPrice])

    useEffect(() => {
        console.log(tableData);
    }, [tableData])

    useEffect(() => {
        loadData();
    }, [])

    function loadData() {
        fetch('https://revs-grill-backend.onrender.com/menuitems/')
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }

    //Edit Item Price
    function editItemPrice() {
        const raw = JSON.stringify({
            menuitemid: selectedID,
            menuprice: newPrice,
        })

        var requestOptions = {
            method: 'POST',
            body: raw
        };
        console.log(requestOptions.body);
        fetch('https://revs-grill-backend.onrender.com/manager/action/update-menu-item', requestOptions);
        setSelectedID([]);
        setNewPrice([]);
    }
    //Add new Item
    function addMenuItem(name, price, classID) {
        var raw = JSON.stringify({
            "name": name,
            "menuprice": price,
            "classid": classID
        });

        var requestOptions = {
            method: 'POST',
            body: raw
        };
        fetch('https://revs-grill-backend.onrender.com/manager/action/add-new-menu-item')
    }
    //Delete item
    function deleteMenuItem(itemID) {
        var raw = JSON.stringify({
            "menuitemid": itemID
        });

        var requestOptions = {
            method: 'POST',
            body: raw
        };
        fetch('https://revs-grill-backend.onrender.com/manager/action/delete-menu-item')
    }


    return (
        <div>
            <div class="Menu-Functions">
                <button class="Manager-Tab-Button" onClick={loadData} >Load</button>
                <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="New item price"
                    prefix='$'
                    allowNegativeValue={false}
                    decimalScale={2}
                    value={newPrice}
                    onValueChange={(value) => setNewPrice(value)}
                />
                <button class="Manager-Tab-Button" onClick={editItemPrice}>Confirm</button>
            </div>

            <div className='POS-container'>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    getRowId={(row) => row.menuitemid}
                    disableRowSelectionOnClick
                    checkboxSelection
                    disableMultipleRowSelection={true}
                    onRowSelectionModelChange={(selection) => {
                        if (selection.length > 1) {
                            const latest = selection[selection.length - 1];
                            setSelectedID(latest);
                        } else {
                            setSelectedID(selection[0]);
                        }
                    }}
                    rowSelectionModel={selectedID}
                />
            </div>
        </div>
    )
}

export default Menu;