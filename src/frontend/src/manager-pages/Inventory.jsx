import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios";

function Inventory () {
    const [data, setData] = useState([]);
    const [ingredientid, setIngredientId] = useState(null);
    const [curramount, setCurrAmount] = useState(null);
    const [minamount, setMinAmount] = useState(null);
    const [formData, setFormData] = useState({ingredientid: null, curramount: null, minamount: null});

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

    const handleIngredientId = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
        setIngredientId(event.target.value);
        console.log("event val", ingredientid);
    }
    const handleMinAmount = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
        setMinAmount(event.target.value);
        console.log("event val", ingredientid);
    }

    const handleCurrAmount = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setFormData({...formData, [name]: value});
        setCurrAmount(event.target.value);
        console.log("event val", ingredientid);
    }

    const handleSubmit = (event,ingredientid,curramount,minamount) => {
        
        event.preventDefault();
        var raw = JSON.stringify({
            "ingredientid": ingredientid,
            "curramount": curramount,
            "minamount": minamount
        });

        var requestOptions = {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            method: 'POST',
            body: raw
        };
        console.log(requestOptions);
        fetch('https://revs-grill-backend.onrender.com/manager/action/update-inventory',requestOptions)
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
                <form onSubmit={handleSubmit} id = "form1">
                    <label>
                        Ingredient ID:
                        <input type="text" name="ingredientid" value={formData.ingredientid} onChange={handleIngredientId} />
                    </label>
                    <br />
                    <label>
                        New Current Amount:
                        <input type="text" name="curramount" value={formData.curramount} onChange={handleCurrAmount} />
                    </label>
                    <br />
                    <label>
                        New Min Amount:
                        <input type="text" name="minamount" value={formData.minamount} onChange={handleMinAmount} />
                    </label>
                    <br />
                    <button form = "form1" type="submit">Update</button>
                </form>
            </div>

        </div>
    </body>);
}

export default Inventory;