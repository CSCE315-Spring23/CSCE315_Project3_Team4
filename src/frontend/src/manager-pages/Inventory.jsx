import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios";

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
      }, []);

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
        </div>
    </body>);
}

export default Inventory;