import React, { Suspense, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// lazy loading micro frontends
const ProductDetail = React.lazy(() => import('product/ProductDetail'));
const Cart = React.lazy(() => import('cart/TinyCart'));

const Purchase = () => {
  // auth State: get token from Session storage and set auth to true
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) setAuth(true);
  }, []);

  return (
    <Container fluid>
      {auth ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Container fluid>
            <Row>
              <Col>
                <ProductDetail />
              </Col>
              <Col>
                <Cart />
              </Col>
            </Row>
          </Container>
        </Suspense>
      ) : (
        <Container>
          <Row>
            <h1>Product Details</h1>
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

export default Purchase;
