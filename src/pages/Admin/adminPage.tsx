import { Col, Container, Row } from "react-bootstrap"
import Header from "../../components/header/header"
import ProductList from "../../components/productList/productList"

function AdminPage() {
 
  return (
    <>
        <Header />
        <Container>
            <Row>
                <Col >
                    <ProductList />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AdminPage
