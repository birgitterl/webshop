import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from './FormContainerAuth';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [alert, setAlert] = useState(null);
  const [dirtyPassword, setDirtyPassword] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setDirtyPassword(true);
      setAlert({ variant: 'danger', message: 'Passwords do not match' });
    } else {
      const user = {
        username: username,
        password: password,
        name: name,
        email: email,
        emp_no: empNo
      };
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        const res = await axios.post(
          'http://localhost:8080/users',
          user,
          config
        );
        console.log(res.data);
        navigate('/login');
      } catch (error) {
        const errCode = error.response.data.status;
        const errMessage = error.response.data.msg;
        if (errCode == 400) {
          setUserExists(true);
          setAlert({ variant: 'danger', message: errMessage });
        }
        console.log(
          'Error Status: ' + errCode + 'Error Message: ' + errMessage
        );
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setDirtyPassword(false);
      setUserExists(false);
      setAlert(null);
    }, 5000);
  }, [alert]);

  return (
    <div>
      {alert !== null && <Alert variant={alert.variant}>{alert.message}</Alert>}
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
              type="empno"
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
    </div>
  );
};

export default Register;
