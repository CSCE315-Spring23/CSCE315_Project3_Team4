import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import axios from "axios";

/**
 * @function Inventory
 * @description Renders an Inventory component with a table to display the inventory data and a form to update the inventory.
 * @returns {JSX.Element} A body with the 'body' className containing a table to display the inventory data, and a form to update the inventory.
 */
function Inventory () {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
          .get("https://revs-grill-backend.onrender.com/manager/report/inventory-report")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { ingredientid, minamount, curramount } = e.target.elements;
        console.log({ingredientid: ingredientid.value, minamount: minamount.value , curramount: curramount.value});

        const raw = JSON.stringify({
            ingredientid: ingredientid.value,
            minamount: minamount.value,
            curramount: curramount.value,
        });

        var requestOptions = {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            method: "POST",
            body: raw,
        };
        console.log(requestOptions.body);
        fetch('https://revs-grill-backend.onrender.com/manager/action/update-inventory', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
    }

    return (<body class="body">
        <div class="section-pos-body wf-section">
            <div class="pos-border">

                <div>
                    <h1>Inventory</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Ingredient ID</th>
                            <th>Name</th>
                            <th>Current Amount</th>
                            <th>Unit</th>
                            <th>Min Amount</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr key={item.ingredientid}>
                            <td>{item.ingredientid}</td>
                            <td>{item.name}</td>
                            <td>{item.curramount}</td>
                            <td>{item.unit}</td>
                            <td>{item.minamount}</td>
                            <td>{item.cost}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div>
                <h2>Update Inventory</h2>
                <form id = "form1" onSubmit={handleSubmit}>
                    <label>
                        Ingredient ID:
                        <input type="text" name="ingredientid" id="ingredientid" />
                    </label>
                    <br />
                    <label>
                        New Current Amount:
                        <input type="text" name="curramount" id="curramount" />
                    </label>
                    <br />
                    <label>
                        New Min Amount:
                        <input type="text" name="minamount" id="minamount"/>
                    </label>
                    <br />
                    <button form = "form1" type="submit">Update</button>
                </form>
            </div>

        </div>
    </body>);
}

export default Inventory;