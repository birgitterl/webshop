import React, {useEffect, useState} from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductCatalog = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [id, setID] = useState();

const currency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
});

  useEffect(() => {
    setLoading(true)
    const getProductData = async() => {
            await axios.get(
                `https://fakestoreapi.com/products`
                ).then((res) => {
                    setProductList(res.data)
                    setLoading(false)
                })
        }
    getProductData()
  },[]);

  function handleClick(id) {
    setID(id);
  }
 
 
    return (
        <Container fluid>
            <Row>
                <h1>Corporate Offering</h1>
            </Row>
            <Row md={{span:4}}>
                {productList.map((item, index) => (
                        <Col className="col-md4-bottom-margin" md={{span: 4}}key={index}>
                            <Card style={{height:'40rem'}}>
                                <Card.Img variant="top"src={item.image} style={{width:200}} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{currency.format(item.price)}</Card.Text>
                                    <a href={`/details/${item.id}`} onClick={() => handleClick(item.id)}>
                                        <Button >Show Details</Button>
                                    </a>
                                </Card.Body>

                            </Card>
                           
                        </Col>
                        ))}
            </Row>
        </Container>
    );
}

export default ProductCatalog;