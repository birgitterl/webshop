import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h1>Welcome to our Coporate Store</h1>
      </Row>
      <Row className="justify-content-md-center">
        <h4>Create your account or sign in</h4>
      </Row>
      <p />
      <Row className="justify-content-md-center">
        <Button className="btn-primary-width" variant="primary" href="/login">
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
  );
};

export default LandingPage;
