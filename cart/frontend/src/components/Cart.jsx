import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import ShoppingCart from './ShoppingCartComponent';

const Cart = () => {
  // auth State: get token from Session storage and set auth to true
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) setAuth(true);
  }, []);

  return (
    <Container fluid>
      <h1>Your Cart</h1>

      {auth ? (
        <ShoppingCart />
      ) : (
        <Container>
          <Row>
            <h5 style={{ color: 'red' }}>
              This page is only visible to autorized users - please sign in or
              register first
            </h5>
          </Row>
          <br />
          <Row>
            <Button
              className="btn-primary-width"
              variant="primary"
              href="/login"
            >
              Sign In
            </Button>
            <Button
              className="btn-primary-width"
              variant="primary"
              href="/register"
            >
              Register
            </Button>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Cart;
