import React, { useEffect, useState } from "react";
import "../components/server.css"
import { DateTimePicker, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'menuitemid', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Item Name', width: 500 },
    { field: 'menuprice', headerName: 'Price', width: 200 },
    { field: 'classid', headerName: 'Item Type', width: 100 }
]

function Menu() {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        console.log(tableData);
    }, [tableData])

    function loadData() {
        fetch('https://revs-grill-backend.onrender.com/menuitems/')
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }

    //Edit Item Price
    function editItemPrice(itemID, newPrice) {
        var raw = JSON.stringify({
            "menuitemid": itemID,
            "menuprice": newPrice
        });

        var requestOptions = {
            method: 'POST',
            body: raw
        };
        fetch('https://revs-grill-backend.onrender.com/manager/action/update-menu-item')
    }
    //Add new Item
    function editItemPrice(name, price, classID) {
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
    function editItemPrice(itemID) {
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
            </div>

            <div className='POS-container'>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    getRowId={(row) => row.menuitemid}
                    disableRowSelectionOnClick
                    checkboxSelection
                />
            </div>
        </div>
    )
}

export default Menu;