import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FormContainer from './FormContainerAuth';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] =useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [empNo, setEmpNo] = useState('');
    const [error, setError] = useState({});
    const [dirtyPassword, setDirtyPassword] = useState(false);
    const [user, setUser] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setDirtyPassword(true);
      setError({variant:"danger", message:"Passwords do not match"})
    } else {
      setDirtyPassword(false);
      setUser({
          username: username,
          password: password,
          name: name,
          email: email,
          emp_no: empNo
      })
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

    try {
      const res = async() => {
      await axios.post(
        '/users', user, config).then(res => {console.log(res.data)});
      }
    } catch (error) {
      console.log(error.message)
      
   
    }
    }
  };

  function register(user) {
    
    
  }
  useEffect(() => {
  }, [dirtyPassword])
  

    return (
    <FormContainer>
      
      <h1>Register your account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="empNo">
          <Form.Label>Employee Number</Form.Label>
          <Form.Control
            type="empNo"
            placeholder="Enter your Employee ID"
            value={empNo}
            onChange={(e) => setEmpNo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        {dirtyPassword && <div className={`alert alert-${error.variant}`}>
      {error.message}
    </div>}
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;