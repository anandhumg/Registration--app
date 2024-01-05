import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button,Nav,Navbar } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login', { email, password })
      .then((result) => {
        navigate('/home');
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand style={{margin:"0 0 0 45%"}} href="/">Login</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/signup">SignUp</Nav.Link>
          </Nav>
        </Navbar>
   
    <Container style={{width:"30%"}}>
      <h1 style={{textAlign:"center"}}>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div style={{margin: "5% 0 0 40%"}}>

        <Button variant="primary" type="submit" >
          Log In
        </Button><br/>
        </div>
        <Link to={'/signup'} style={{margin:"0 0 0 30%"}}>dont't have an account?</Link>
      </Form>
    </Container>
    </div>
  );
}

export default Login;
