import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useNavigate, Link } from 'react-router-dom';
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [userState, setUserState] = useState('');
  const navigate = useNavigate();
  const stateSuggestions = ['Gujarat', 'Maharashtra', 'Karnataka'];
  const handleStateChange = (selected) => {
    setUserState(selected[0]);
  };

  const handleSubmit = (e) => {
    if (!name || !email || !phone || !gender || !hearAbout.length || !password || !city || !userState) {
      alert('Please fill in all mandatory fields.');
      return;
    }


    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert('Name should contain only alphabets.');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert('Phone should contain only numbers.');
      return;
    }

    e.preventDefault();
    var userData = {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      hearAbout: hearAbout,
      password: password,
      city: city,
      state: userState,
    };
    axios
      .post('http://localhost:8000/register', userData)
      .then((result) => {
        console.log(result.data);
        navigate('/login')
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const handleCheckboxChange = (option) => {
    const updatedHearAbout = hearAbout.includes(option)
      ? hearAbout.filter((item) => item !== option)
      : [...hearAbout, option];
    setHearAbout(updatedHearAbout);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center align-items-center" >
        <Navbar.Brand style={{margin:"0 0 0 45%"}} href="/signup">Sign Up</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Login</Nav.Link>
        </Nav>
      </Navbar>

      <Container style={{ width: "40%" }}>
      <h1 style={{textAlign:"center"}}>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formGender" required>
            <Form.Label>Gender</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  label="Male"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Female"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="others"
                  id="otherGender"
                  name="gender"
                  value="others"
                  checked={gender === 'others'}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </Form.Group>


          <Form.Group controlId="formHearAbout" required>
            <Form.Label>How did you hear about us ?</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="LinkedIn"
                  id="hearAboutLinkedIn"
                  checked={hearAbout.includes('LinkedIn')}
                  onChange={() => handleCheckboxChange('LinkedIn')}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Friends"
                  id="hearAboutFriends"
                  checked={hearAbout.includes('Friends')}
                  onChange={() => handleCheckboxChange('Friends')}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Job Portal"
                  id="hearAboutJobPortal"
                  checked={hearAbout.includes('Jobportal')}
                  onChange={() => handleCheckboxChange('Jobportal')}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="others"
                  id="hearAboutOthers"
                  checked={hearAbout.includes('others')}
                  onChange={() => handleCheckboxChange('others')}
                />
              </Col>
            </Row>
          </Form.Group>


          <Form.Group controlId="formCity" re>
            <Form.Label>City</Form.Label>
            <Form.Control as="select" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">-- Select City --</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>

            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Typeahead
              id="stateTypeahead"
              options={stateSuggestions}
              onChange={handleStateChange}
              selected={userState ? [userState] : []}
              placeholder="Select a state..."
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" style={{ margin: "0 0 0 50%" }}>
            Sign Up
          </Button><br />
          <Link to={'/'} style={{ margin: "0 0 0 42%" }}>Already have an account</Link>
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
