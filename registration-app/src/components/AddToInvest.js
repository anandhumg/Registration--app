import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from 'react-bootstrap';
import axios from 'axios';

function AddToInvest() {
  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/persons')
      .then((response) => {
        setUserDatas(response.data);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 1303
 },
    { field: 'name', headerName: 'Name', width: 130 }, // Change 'Name' to 'name'
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 }, // Change 'amount' to 'Amount'
  ];

  const rows = userDatas.map((data) => ({
    id: data._id,
    name: data.username,
    email: data.email,
    amount: data.amount,
  }));

  return (
    <div>
      <Container>
        <TextField id="outlined-basic" label="Stock Name" variant="outlined" />
        <TextField id="outlined-basic" label="Price" variant="outlined" />
        <TextField id="outlined-basic" label="Percentage" variant="outlined" />

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5} // Set the pageSize directly
            checkboxSelection
          />
        </div>
      </Container>
    </div>
  );
}

export default AddToInvest;
