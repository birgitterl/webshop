import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductCatalog = () => {
  const [productList, setProductList] = useState([]);
  const [productsFetched, setProductsFetched] = useState(false);
  // auth State: get token from Session storage and set auth to true
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) setAuth(true);
  }, []);

  // format currency fields
  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  // retrieve products from fakestoreapi upon successfull authentication
  useEffect(() => {
    const getProductData = async () => {
      try {
        await axios
          .get(`https://fakestoreapi.com/products`)
          .then(setProductsFetched(true))
          .then((res) => {
            setProductList(res.data);
          });
      } catch (error) {
        console.log(error);
        setProductsFetched(false);
      }
    };
    getProductData();
  }, [auth]);

  return (
    <Container fluid>
      <Row>
        <h1>Corporate Offering</h1>
      </Row>
      {auth && productsFetched ? (
        <Row md={{ span: 4 }}>
          {productList.map((item, index) => (
            <Col className="col-md4-bottom-margin" md={{ span: 4 }} key={index}>
              <Card style={{ height: '40rem' }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: 200 }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{currency.format(item.price)}</Card.Text>
                  <a href={`/details/${item.id}`}>
                    <Button>Show Details</Button>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : auth && !productsFetched ? (
        <Container>
          <Row>
            <h5 style={{ color: 'red' }}>
              Something went wrong - please try again later...
            </h5>
          </Row>
        </Container>
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

export default ProductCatalog;
