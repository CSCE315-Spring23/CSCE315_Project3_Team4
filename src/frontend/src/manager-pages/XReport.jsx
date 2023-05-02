import React, { Component } from 'react';
import './style.css';
import NavBar from '../components/managerNavBar';
import axios from "axios";
import { useState, useEffect } from 'react';

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
        <NavBar />
        <div class="section-employee-name wf-section">
            <div class="employee-text">
                <strong class="bold-text">Employee: <br></br></strong>
            </div>
        </div>
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