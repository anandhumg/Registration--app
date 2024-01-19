import React from 'react';
import axios from 'axios';
import { Button, Container, Table, Modal, FormControl, Form, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
  const [userData, setUserData] = useState(['']);
  const [count, setCount] = useState(['']);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');

  useEffect(() => {
    axios.get(`http://localhost:8000/person-search?search=${searchQuery}`)
      .then((response) => {
        setUserData(response.data);
        setCount(response.data.length);
      })
      .catch((error) => {
        alert(error);
      });
  }, [searchQuery]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchData = () => {
    axios.get(`http://localhost:8000/persons?sortOrder=${sortOrder}`)
      .then((response) => {
        setCount(response.data.length);
        setUserData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {

    localStorage.setItem('sortOrder', sortOrder);
    fetchData();
  }, [sortOrder]);

  useEffect(() => {

    const savedSortOrder = localStorage.getItem('sortOrder');
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);
  const handleEdit = (id) => {
    navigate(`/addoredit/${id}`)
  }

  const handleView = (id) => {
    navigate(`/addoredit/${id}/view`)

  }

  const handleDelete = (id) => {
    setDeleteId(id);
    handleShow();

  }
  const handleDeleteMOdal = () => {
    if (deleteId) {
      axios.delete(`http://localhost:8000/delete-person/${deleteId}`)
        .then((response) => {
          alert(response.data.message)
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.error);
          window.location.reload();
        });
      handleClose();
    }
  };
  if (count === 0) {
    return (
      <Container>
        <div className='mt-5'>
          <Link
            to={'/addoredit'}
            className='btn btn-success mb-5'
          >Add  +</Link>
          <h1 style={{ margin: "0 0 0 40%" }}>No Data Found</h1>
        </div>
      </Container>
    )
  } else {

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">DashBoard</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="/signup">sign- up</Nav.Link>
            <Nav.Link href='/addtoinvest'>Invest</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </Navbar>
        <div className='container mt-5'>
          <Link
            to={'/addoredit'}
            className='btn btn-success mb-5'
          >Add  +</Link>
          <DropdownButton id="dropdown-basic-button" title="Sort Order">
            <Dropdown.Item onClick={() => handleSort('asc')}>A-Z</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('desc')}>Z-A</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('lastModified')}>Last Modified</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('lastInserted')}>Last Inserted</Dropdown.Item>
          </DropdownButton>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Invested Amount</th>
                <th>Balance Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            {userData.map((data, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.amount}</td>
                    <td>{data.balAmount}</td>
                    <td>
                      <Button variant='info' onClick={() => { handleView(data._id) }} >view</Button>
                      <Button variant='warning' className="ml-3" onClick={() => { handleEdit(data._id) }}>Edit</Button>
                      <Button variant='danger' className="ml-3" onClick={() => { handleDelete(data._id) }}>Delete</Button>
                    </td>
                  </tr>
                </tbody>
              )
            })}

          </Table>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete ?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleDeleteMOdal}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
      </div>
    )
  }
}

export default Home
