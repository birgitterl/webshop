import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
const cart_channel = new BroadcastChannel('cart_channel');

const TinyCart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [cartPrice, setCartPrice] = useState(0);
  const username = 'birgit';
  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  cart_channel.onmessage = function (e) {
    console.log(e);
    const { id, title, price, description, category, image } = e.data;
    setProduct({
      ...product,
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image
    });
  };

  useEffect(() => {
    setLoading(true);
    const loadCart = async () => {
      try {
        await axios
          .get(`http://localhost:8081/cart/${username}`)
          .then((res) => {
            console.log(res.data.cart);
            setCart(res.data.cart.products);
            setCartPrice(res.data.cart.cartPrice);
          })
          .then(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    setLoading(true);
    const addProduct = async () => {
      try {
        await axios
          .post('http://localhost:8081/product', product, config)
          .then((res) => {
            console.log(res.data);
            const { id, title, price, totalAmount } = res.data.product;
            setCartItem({
              ...cartItem,
              id: id,
              title: title,
              quantity: 1,
              price: price,
              totalAmount: totalAmount
            });
          })
          .then(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    addProduct();
  }, [product]);

  useEffect(() => {
    setLoading(true);
    const addCartItems = async () => {
      try {
        const res = await axios
          .post(`http://localhost:8081/cart/${username}`, cartItem, config)
          .then((res) => {
            setCart(res.data.cart.products);
            setCartPrice(res.data.cart.cartPrice);
          })
          .then(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    addCartItems();
  }, [cartItem]);

  useEffect(() => {}, [cart]);

  return (
    <Container fluid>
      <Row>
        <h1>Your Cart</h1>
      </Row>
      <Row></Row>
      <Row>
        <Col>
          <h6 className="text-left">Article</h6>
        </Col>
        <Col>
          <h6 className="text-center">Quantity</h6>
        </Col>
        <Col>
          <h6 className="text-center">Unit Price</h6>
        </Col>
        <Col>
          <h6 className="text-center">Total Amount</h6>
        </Col>
      </Row>
      <Row>
        <Container fluid>
          <Row>
            <p></p>
          </Row>
          {cart.length > 0 &&
            cart.map((item, index) => (
              <Row className="square border-bottom" key={index}>
                <Col>
                  <p>{item.title}</p>
                </Col>
                <Col>
                  <p className="text-center">{item.quantity}</p>
                </Col>
                <Col>
                  <p className="text-right">{currency.format(item.price)}</p>
                </Col>
                <Col>
                  <p className="text-right">
                    {currency.format(item.totalAmount)}
                  </p>
                </Col>
              </Row>
            ))}
          <Row>
            <p></p>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <h4>Total Amount</h4>
            </Col>
            <Col>
              {cartPrice != 0 && (
                <h4 className="text-right">
                  <strong>{currency.format(cartPrice)}</strong>
                </h4>
              )}
            </Col>
          </Row>
        </Container>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/cart');
            }}
          >
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TinyCart;
