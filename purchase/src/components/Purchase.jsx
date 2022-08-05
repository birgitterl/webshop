import React, {Suspense} from 'react';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';

const ProductDetail = React.lazy(() => import ("product/ProductDetail"));
const Cart = React.lazy(() => import("cart/Cart"));

const Purchase = () => {

    return (
            <Suspense fallback={<div>Loading...</div>}>
                <Container fluid>
                    <Row>
                        <Col>
                            <ProductDetail/>
                        </Col>
                        <Col>
                            <Cart />
                        </Col>
                    </Row>
                </Container>
            </Suspense>
    )
}

export default Purchase;