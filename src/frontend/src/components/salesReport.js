import React, { useEffect, useState } from "react";
import "../components/server.css"
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'Menu Item', headerName: 'Item Name' },
    { field: 'Quantity Sold', headerName: 'Quantity Sold', width: 300 },
    { field: 'Sales', headerName: 'Sales', width: 600 }
]

function SalesReport() {

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        console.log(tableData);
    }, [tableData])

    useEffect(() => {
        console.log("Start: ", start);
    }, [start])

    useEffect(() => {
        console.log("End: ", end);
    }, [end])

    useEffect(() => {
        console.log("Error: ", error);
    }, [error])

    function loadData() {
        if (start && end) {
            const startStr = moment(new Date(start)).format('YYYY-MM-DD');
            const endStr = moment(new Date(end)).format('YYYY-MM-DD');
            console.log("Start String: ", startStr);
            console.log("End String: ", endStr);
            fetch('https://revs-grill-backend.onrender.com/manager/report/sales-report?start=' + startStr + '&end=' + endStr)
                .then((data) => data.json())
                .then((data) => setTableData(data))
        }
        console.log("error: ", error);
        console.log("Start: ", start);
        console.log("End: ", end);
    }

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'minDate': {
                return "'Start' must be before 'End'";
            }

            case 'invalidDate': {
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [error]);

    return (
        <div>
            <div class="Server-Functions">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="Date-Time-Field"
                        label="Start"
                        disableFuture
                        defaultValue={null}
                        value={start}
                        onChange={(newValue) => setStart(newValue)}
                        onError={(newError) => setError(newError)}
                        slotProps={{
                            textField: {
                                helperText: errorMessage,
                            },
                        }} />
                    <DatePicker
                        className="Date-Time-Field"
                        label="End"
                        disableFuture
                        defaultValue={null}
                        value={end}
                        minDate={start}
                        onChange={(newValue) => setEnd(newValue)}
                        onError={(newError) => setError(newError)}
                        slotProps={{
                            textField: {
                                helperText: errorMessage,
                            },
                        }} />
                </LocalizationProvider>
                <button class="Manager-Tab-Button" onClick={loadData} >Load</button>
            </div>

            <div className='POS-container'>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default SalesReport;