import React, { useEffect, useState } from 'react';
import { TextField,Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './style.css'
function AddToInvest() {
  const [userDatas, setUserDatas] = useState([]);
  const [investData,setInvestedData] = useState(['']);
  const [stockName,setStockName] = useState(['']);
  const [stockPrice,setStockPrice] = useState(['']);
  const [stockPercentage,setStockPercentage] = useState(['']);
  const [purchaseDate,setPurchaceDate] =useState([''])
  const [selectedUser ,setSelectedUser] = useState([])


  useEffect(() => {
    axios.get('http://localhost:8000/persons')
      .then((response) => {
        setUserDatas(response.data);
      });
  }, []);

  const handleSave = ()=>{
   setInvestedData((prevInvestedData) => ({
    ...prevInvestedData,
    stockName,
    stockPrice,
    stockPercentage,
    selectedUser,
  }));
  
    // axios.post('http://localhost:8000/invested-data',investData)
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  }
  useEffect(() => {
    console.log(investData);
    
  }, [investData]); 

  const handleSelectionChange = (selectionModel) => {
    
    const selectedRows = selectionModel.map((selectedIndex) => rows[selectedIndex]);
    const selectedIds = selectedRows.map((row) => row.id);
    setSelectedUser(selectedIds);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 130},
    { field: 'name', headerName: 'Name', width: 130 }, 
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 }, 
  ];

  const rows = userDatas.map((data) => ({
    id: data._id,
    name: data.username,
    email: data.email,
    amount: data.amount,
  }));

  return (
    <div className='investContainer'>
      <Container>
        <form>
        <TextField id="outlined-basic" label="Stock Name" variant="outlined" onChange={(e)=>{setStockName(e.target.value)}} />
        <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(e)=>{setStockPrice(e.target.value)}}/>
        <TextField id="outlined-basic" label="Percentage" variant="outlined" onChange={(e)=>{setStockPercentage(e.target.value)}}/>
        {/* <DatePicker label="Basic date picker" onChange={(e)=>{setPurchaceDate(e.target.value)}}/> */}

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5} 
            checkboxSelection
            onChange={handleSelectionChange}
          />
        </div>

        <Button variant="outlined" onClick={handleSave}>SAVE</Button>
        </form>
      </Container>
    </div>
  );
}

export default AddToInvest;
