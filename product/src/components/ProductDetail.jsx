import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
const cart_channel = new BroadcastChannel('cart_channel');

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      try {
        await axios
          .get(`https://fakestoreapi.com/products/${id}`)
          .then((res) => {
            const { id, title, price, description, category, image } = res.data;
            setProduct({
              ...product,
              id: id,
              title: title,
              price: price,
              description: description,
              category: category,
              image: image
            });
          })
          .then(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  function handleClick() {
    cart_channel.postMessage(product);
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
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate('/products');
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Col>
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
