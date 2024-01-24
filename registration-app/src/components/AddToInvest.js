import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

function AddToInvest() {
  const [userDatas, setUserDatas] = useState([]);
  const [investData, setInvestedData] = useState({
    stockName: '',
    stockPrice: '',
    stockPercentage: '',
    selectedUserIds: [],
    purchaseDate:''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/persons').then((response) => {
      setUserDatas(response.data);
    });
  }, []);

  const handleCheckboxChange = (userId) => {
    setInvestedData((prevInvestedData) => {
      const isSelected = prevInvestedData.selectedUserIds.includes(userId);

      if (isSelected) {
        return {
          ...prevInvestedData,
          selectedUserIds: prevInvestedData.selectedUserIds.filter((id) => id !== userId),
        };
      } else {
        return {
          ...prevInvestedData,
          selectedUserIds: [...prevInvestedData.selectedUserIds, userId],
        };
      }
    });
  };
  const handleSave = () => {
    axios.post('http://localhost:8000/invested-data', {
      stockName: investData.stockName,
      stockPrice: investData.stockPrice,
      stockPercentage: investData.stockPercentage,
      purchaseDate: investData.purchaseDate,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    axios.patch('http://localhost:8000/update-bal-amount', investData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div className='investContainer'>
      <Container>
        <form>
        <TextField
  id='outlined-basic'
  label='Stock Name'
  variant='outlined'
  onChange={(e) => setInvestedData({ ...investData, stockName: e.target.value })}
/>

<TextField
  id='outlined-basic'
  label='Price'
  variant='outlined'
  onChange={(e) => setInvestedData({ ...investData, stockPrice: e.target.value })}
/>

<TextField
  id='outlined-basic'
  label='Percentage'
  variant='outlined'
  onChange={(e) => setInvestedData({ ...investData, stockPercentage: e.target.value })}
/>

<input
  label='Date'
  type="date"
  onChange={(e) => setInvestedData({ ...investData, purchaseDate: e.target.value })}
/>

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Id</th>
                  <th>Invested</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {userDatas.map((data) => {
                  if(data.balAmount>0){
                    return (
                      <tr key={data._id}>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td>{data.amount}</td>
                        <td>
                          <input
                            type='checkbox'
                            checked={investData.selectedUserIds.includes(data._id)}
                            onChange={() => handleCheckboxChange(data._id)}
                          />
                        </td>
                      </tr>
                    );
                  }
                  return null
                })}
              </tbody>
            </Table>
          </div>
          <Button variant='outlined' onClick={handleSave}>
            SAVE
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddToInvest;
