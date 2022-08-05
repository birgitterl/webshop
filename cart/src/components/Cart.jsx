import React, {useState, useEffect}from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';


const Cart = () => {
    const cart_channel = new BroadcastChannel("cart_channel");
    
    let [cart, setCart] = useState([]);

    cart_channel.onmessage = function(e) {
        if(cart.some(item => item.title === e.data.title)) {
            const product = cart.find(item => item.title == e.data.title);
            console.log(`Quantity of ${product.title}: ${product.quantity}`)
        } else {
            const product = e.data;
            setCart([...cart, product]);
            console.log(`Product ID: ${product.id}`)
            console.log(`Title: ${product.title}`)
            console.log(cart)
            
        }
    };

   

    const currency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
});
    
    return (
         <Container fluid >
            <Row>
                <h1>Your Cart</h1>
            </Row>
            <Row>
                <Col>
                    <h6>Article</h6>
                </Col>
                <Col>
                    <h6>Quantity</h6>
                </Col>
                <Col>
                    <h6>Unit Price</h6>
                </Col>
                <Col>
                    <h6>Total Amount</h6>
                </Col>

            </Row>
            <Row>
                <Container className="square border-3">
                    {cart.map((item, index) => (
                        <Row className="square border-bottom" key={index}>
                            <Col>
                                <p>{item.title}</p>
                            </Col>
                            <Col>
                                <p>{item.quantity}</p>
                            </Col>
                            <Col>
                                <p className="text-center">{currency.format(item.price)}</p>
                            </Col>
                            <Col>
                                <p>blah</p>
                            </Col>
                        </Row>
                    ))}
                </Container>
                        
            </Row>
        </Container>
    );
}

export default Cart;