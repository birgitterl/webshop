import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const cartItems = [];

  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  const cart_channel = new BroadcastChannel('cart_channel');

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      await axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
        setProduct({});
        setProduct(res.data);
        setLoading(false);
      });
    };
    getProductData();
  }, []);

  function handleClick() {
    cart_channel.postMessage(product);
    console.log(product);
  }

  return (
    <Container fluid>
      {loading ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row>
            <h1>{product.title}</h1>
          </Row>
          <Row>
            <Col md={{ span: 5 }}>
              <img src={product.image} style={{ width: 150 }} />
            </Col>
            <Col>
              <Container fluid>
                <Row>
                  <h1>{currency.format(product.price)}</h1>
                </Row>
                <Row>
                  <p>{product.description}</p>
                </Row>
                <Row>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ProductDetail;
