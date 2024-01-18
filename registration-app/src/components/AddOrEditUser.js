import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Modal,Nav,Navbar, CardTitle } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function AddOrEditUser({ viewMode }) {
  const [show, setShow] = useState(false);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resMess, setresMess] = useState('');
  const [title, setTitle] = useState('');
  const [amount,setAmount] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/persons/${id}`).then((response) => {
        var data = response.data;
        setName(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setTitle(viewMode ? 'View User' : 'Edit User');
      });
    } else {
      setTitle('Add User');
    }
  }, [viewMode, id]);

  const redirectButton = () => {
    navigate('/home');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var userData = {
      username: username,
      email: email,
      phone: phone,
      amount:amount
    };

    if (!id) {
      axios
        .post('http://localhost:8000/new-person', userData)
        .then((result) => {
          setresMess(result.data);
          handleShow();
        })
        .catch((err) => {
          setresMess(err.data);
          handleShow();
        });
    } else {
      axios
        .patch(`http://localhost:8000/update-person/${id}`, userData)
        .then((result) => {
          setresMess(result.data);
          handleShow();
        })
        .catch((err) => {
          setresMess(err.data);
          handleShow();
        });
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand style={{margin:"0 0 0 45%"}} href="/signup">{title}</Navbar.Brand>
      </Navbar>
    <Container style={{ width: '50%'  }}>

      <Form className="mt-4" onSubmit={handleSubmit}>
  
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setName(e.target.value)} required  readOnly={viewMode}/>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly={viewMode}/>
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required readOnly={viewMode}/>
            </Form.Group>
           < Form.Group controlId="formAmount">
              <Form.Label>Invested Amount</Form.Label>
              <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required readOnly={viewMode}/>
            </Form.Group>
      

        <br />
        {!viewMode && (
          <Button variant="primary" type="submit" style={{ margin: '0 0 0 40%' }}>
            {title}
          </Button>
        )}
      </Form>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p>{resMess}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={redirectButton}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
    </div>
  );
}

export default AddOrEditUser;
