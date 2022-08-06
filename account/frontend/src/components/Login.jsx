import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from './FormContainerAuth';
import { Alert, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const res = await axios.post('http://localhost:8080/auth', body);
      console.log(res.data);
      window.sessionStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (error) {
      const errCode = error.response.data.status;
      const errMessage = error.response.data.msg;
      if (errCode == 404) {
        setAlert({ variant: 'danger', message: errMessage });
      }
      console.log('Error Status: ' + errCode + ' Error Message: ' + errMessage);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, [alert]);

  return (
    <div>
      {alert !== null && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <FormContainer>
        <h1>Sign In</h1>
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
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
