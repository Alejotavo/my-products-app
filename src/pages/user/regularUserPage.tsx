import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/header/header";
import { useProductContext } from "../../context/productContext";
import { Link } from "react-router-dom";

function RegularUserPage() {

const { products } = useProductContext();

  return (
    <>
    <Header />
    <Container>
        <h2 className="mt-3">Product List</h2>
        <Row className="g-3">    
        {products.map(product => (
            <Col key={product.id} sm={12} md={6} lg={3}>
                <Card>
                    <Card.Body>
                        <h5>{product.title}</h5>
                        <p>{product.details}</p>
                        <p>{product.stock}</p>
                        <span className="fs-5">${product.price}</span>
                        <Link to={`/product/${product.id}`} className="text-end d-block">See more</Link>
                    </Card.Body>
                </Card> 
            </Col>))}
        </Row>
    </Container>
    </>
  );
}

export default RegularUserPage;