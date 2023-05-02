import React, { useEffect, useState } from "react";
import "../components/server.css"
import { DateTimePicker, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'count', headerName: 'Amount Sold', width: 300 },
    { field: 'sales', headerName: 'Sales', width: 600 }
]

function SalesReport() {

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        console.log(tableData);
    }, [tableData])

    function loadData() {
        if (!error && start && end) {
            const startStr = start.toISOString();
            console.log("Start String: ", start);
            const endStr = end.toISOString();
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
                    <DateTimePicker
                        className="Date-Time-Field"
                        renderInput={(props) => <DateField {...props} sx={{ m: 5 }} />}
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
                    <DateTimePicker
                        className="Date-Time-Field"
                        label="End"
                        disableFuture
                        defaultValue={null}
                        value={end}
                        minDateTime={start}
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