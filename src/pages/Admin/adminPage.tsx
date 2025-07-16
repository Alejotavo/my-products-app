import { Col, Container, Row } from "react-bootstrap"
import Header from "../../components/header/header"
import TabControl from "../../components/tabControl/tabControl"

function AdminPage() {
 
  return (
    <>
        <Header />
        <Container>
            <Row>
                <Col >
                    <TabControl />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AdminPage
