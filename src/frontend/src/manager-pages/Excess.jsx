import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios";

function Excess () {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .get(`https://revs-grill-backend.onrender.com/manager/report/excess-report/?start=${startDate}`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (<body class="body">
        <div class="section-pos-body wf-section">
            <div class="pos-border">

            <div>
                <h1>Excess Report</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <button type="submit">Get Report</button>
                </form>
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

export default Excess;