import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import FormContainer from './FormContainerAuth';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      login(username, password);
    };

    return (
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
  );
};

export default Login;