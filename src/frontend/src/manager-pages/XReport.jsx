import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios";

/**
 * @function XReport
 * @description Renders an X Report component with a table to display the X report data.
 * @returns {JSX.Element} A body with the 'body' className containing a table to display the X report data.
 */
function XReport() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
          .get("https://revs-grill-backend.onrender.com/manager/report/x-report")
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
                <h1>X Report</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Time</th>
                        <th>Total Price</th>
                        <th>Employee ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.orderid}>
                        <td>{item.orderid}</td>
                        <td>{item.ordertime}</td>
                        <td>{item.totalprice}</td>
                        <td>{item.employeeid}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    </body>);
}

export default XReport;