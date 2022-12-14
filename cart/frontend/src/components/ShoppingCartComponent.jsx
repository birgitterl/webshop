import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [updatedCart, setUpdatedCart] = useState(false);
  const [alert, setAlert] = useState(null);

  // format currency
  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  // header configuration for API calls
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const username = window.sessionStorage.getItem('username');

  // set timeout for alerts
  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, [alert]);

  // load Cart on inital render and upon updates of the cart
  useEffect(() => {
    const loadCart = async () => {
      try {
        await axios
          .get(`http://localhost:8081/cart/${username}`)
          .then((res) => {
            console.log(res.data.cart);
            setCart(res.data.cart.products);
            setCartPrice(res.data.cart.cartPrice);
          })
          .then(() => {});
      } catch (error) {
        const errCode = error.response.data.status;
        const errMessage = error.response.data.msg;
        if (errCode == 404) {
          setAlert({ variant: 'danger', message: errMessage });
        }
      }
    };
    loadCart();
  }, [updatedCart]);

  // delete cart
  async function handleClick() {
    try {
      await axios.delete(`http://localhost:8081/cart/${username}`);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  }

  // update cart item quantity
  async function quantityChange(id, e) {
    try {
      let body = null;
      body = { id: id, increase: e };
      await axios
        .put(`http://localhost:8081/cart/${username}`, body, config)
        .then((res) => {
          console.log(res.data);
          setUpdatedCart(!updatedCart);
        });
    } catch (error) {
      const errCode = error.response.data.status;
      const errMessage = error.response.data.msg;
      // show alert if no cart exists
      if (errCode == 404) {
        setAlert({ variant: 'danger', message: errMessage });
      }
    }
  }

  return (
    <Container fluid>
      {alert !== null && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Container fluid className="square border-bottom">
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
      </Container>
      {cart.length > 0 &&
        cart.map((item, index) => (
          <Container fluid className="square border-bottom" key={index}>
            <Row>
              <p></p>
            </Row>
            <Row className="square border-bottom" key={index}>
              <Col>
                <p>{item.title}</p>
              </Col>
              <Col>
                <p className="text-center">{item.quantity}</p>
                <div className="text-center">
                  <Button onClick={(e) => quantityChange(item.id, true)}>
                    +
                  </Button>
                  <Button onClick={(e) => quantityChange(item.id, false)}>
                    -
                  </Button>
                </div>
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
          </Container>
        ))}
      <Container fluid>
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
                <strong>
                  {cartPrice < 0
                    ? currency.format(0)
                    : currency.format(cartPrice)}
                </strong>
              </h4>
            )}
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <p></p>
        </Row>
        {cart.length > 0 && (
          <Row>
            <Col>
              {' '}
              <Button variant="danger" onClick={handleClick}>
                Delete Cart
              </Button>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Button variant="success" onClick={handleClick}>
                Place Order
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default ShoppingCart;
