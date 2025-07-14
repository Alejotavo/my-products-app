import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useProductContext } from "../../context/productContext";
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import Header from "../header/header";
import ProductModal from "../modal/productModal";
import { useState } from "react";
import { updateProduct } from "./../../services/services";
import type { Product } from "../../models/product";



function ProductDetails() {

const { id } = useParams();
const { products, fetchProducts } = useProductContext();
const { user } = useAuth();
const [showModal, setShowModal] = useState(false);

const product = products.find(p => String(p.id) === id);

const handleShow = () => setShowModal(true);

const handleUpdate = async (productToUpdate: Product) => {
  try {
    await updateProduct(productToUpdate);
    await fetchProducts();
    setShowModal(false)
  } catch (error) {
    console.error("Error al actualizar el producto", error);
  }
};

if (!product) return <p>Producto no encontrado</p>;

  return (
    <>
    <Header />
    <Container>
      <h2 className="mt-3">Product details</h2>
      <Link to={`/`}><Button variant="secondary">Back</Button></Link>
        <Row>
            <Col className="g-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <h5>{product.title}</h5>
                        <p>{product.details}</p>
                        <p>{product.stock}</p>
                        <span className="fs-5">${product.price}</span>
                        <div>
                          {user?.isAdmin && 
                            <Button className="m-2" onClick={handleShow}>Edit</Button>
                        }
                      </div>
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
    </Container>
    {showModal && (
      <ProductModal
        product={product}
        mode="edit"
        onSave={handleUpdate}
        close={() => setShowModal(false)}
      />
    )}
    </>
  );
}

export default ProductDetails;