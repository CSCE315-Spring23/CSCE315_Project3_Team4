import React, { useEffect, useState } from "react";
import "../components/server.css";
import CurrencyInput from "react-currency-input-field";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "menuitemid", headerName: "ID", width: 10 },
    { field: "name", headerName: "Item Name", width: 500 },
    { field: "menuprice", headerName: "Price", width: 200 },
    { field: "classid", headerName: "Item Type", width: 100 },
];

/**
 * Renders the Menu component which displays a table of menu items fetched from a remote server and provides functionality to add, delete, and edit menu items. Uses useState and useEffect hooks to manage component state and API calls.
 *
 * @returns {JSX.Element} A React component representing the Menu page
 */
function Menu() {
    const [tableData, setTableData] = useState([]);
    const [newPrice, setNewPrice] = useState([]);
    const [selectedID, setSelectedID] = useState([]);

    useEffect(() => {
        console.log(selectedID);
    }, [selectedID]);

    useEffect(() => {
        console.log(newPrice);
    }, [newPrice]);

    useEffect(() => {
        console.log(tableData);
    }, [tableData]);

    useEffect(() => {
        loadData();
    }, []);

    /**
   * Fetches menu items from the API and sets the data into the state.
   * @function
   * @name loadData
   * @returns {void}
   */
    function loadData() {
        fetch("https://revs-grill-backend.onrender.com/menuitems/")
            .then((data) => data.json())
            .then((data) => setTableData(data));
    }

    /**
     * Edits the price of a menu item in the backend using a POST request.
     *
     * @function
     * @name editItemPrice
     * @returns {void}
     */
    function editItemPrice() {
        const raw = JSON.stringify({
            menuitemid: selectedID,
            menuprice: newPrice,
        });

        var requestOptions = {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            method: "POST",
            body: raw,
        };
        console.log(requestOptions.body);
        fetch(
            "https://revs-grill-backend.onrender.com/manager/action/update-menu-item",
            requestOptions
        );
        setSelectedID([]);
        setNewPrice([]);
    }

    /**
     * Add a new menu item to the backend
     *
     * @param {string} name - The name of the menu item to be added
     * @param {number} price - The price of the menu item to be added
     * @param {number} classID - The class ID of the menu item to be added
     * @return {void}
     */
    function addMenuItem(name, price, classID) {
        var raw = JSON.stringify({
            name: name,
            menuprice: price,
            classid: classID,
        });

        var requestOptions = {
            method: "POST",
            body: raw,
        };
        fetch(
            "https://revs-grill-backend.onrender.com/manager/action/add-new-menu-item"
        );
    }

    /**
     * Delete a menu item with the given item ID.
     * @param {number} itemID - The ID of the menu item to delete.
     * @returns {void}
     */
    function deleteMenuItem(itemID) {
        var raw = JSON.stringify({
            menuitemid: itemID,
        });

        var requestOptions = {
            method: "POST",
            body: raw,
        };
        fetch(
            "https://revs-grill-backend.onrender.com/manager/action/delete-menu-item"
        );
    }

    return (
        <div>
            <div class="Menu-Functions">
                <button class="Manager-Tab-Button" onClick={loadData}>
                    Load
                </button>
                <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="New item price"
                    prefix="$"
                    allowNegativeValue={false}
                    decimalScale={2}
                    value={newPrice}
                    onValueChange={(value) => setNewPrice(value)}
                />
                <button class="Manager-Tab-Button" onClick={editItemPrice}>
                    Confirm
                </button>
            </div>

            <div className="POS-container">
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
    );
}

export default Menu;
