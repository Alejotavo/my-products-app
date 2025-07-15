import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useProductContext } from "../../context/productContext";
import { useState } from "react";
import AlertMessage from "../toast/toast";
import { Link } from "react-router-dom";
import { addProduct } from "../../services/services";
import ProductModal from "../modal/productModal";
import type { Product } from "../../models/product";
import BarChart from "../BarChart/BarChart";

const emptyProduct: Product = {
  id: 0, // o undefined si el backend genera el ID
  title: "",
  price: 0,
  image: "",
  stock: 0,
  category: "",
  details: "",
};


function ProductList() {
 
  const { products, handleDelete, fetchProducts } = useProductContext();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const handleCreate = async (productToCreate: Product) => {
    try {
      await addProduct(productToCreate);
      await fetchProducts();
      setShowModal(false)
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };


  const handleDeleteWithToast = async (id: number) => {
   await handleDelete(id);
   setToastMessage(`Producto numero ${id} eliminado correctamente`);
   setShowToast(true);
  };

  return (
    <>
    <AlertMessage show={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    <h2 className="mt-3">Product List</h2>
    <Button className="m-2" onClick={handleShow}>Add Product</Button>
    <Row className="g-3">
      <Col  lg={6}>
      <Card className="p-3 h-100">
      <Table striped  hover size="sm">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
          <th style={{ width: '1%', whiteSpace: 'nowrap' }}></th>
        </tr>
      </thead>
      <tbody>
         {products.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <div className="d-flex gap-1 justify-content-end">
                <Button variant="outline-danger" size="sm"   onClick={() => handleDeleteWithToast(product.id)}>Delete</Button>
                <Link to={`/product/${product.id}`}>
                  <Button variant="outline-primary" size="sm">Details</Button>
                </Link>
                </div>
              </td>
            </tr>
        ))}
      </tbody>
      </Table>
      </Card>
      </Col>
      <Col lg={6}>
        <Card className="p-3 h-100">
        <BarChart />
        </Card>
      </Col>
    </Row>
    
      {showModal && (
      <ProductModal
        product={emptyProduct}
        mode="create"
        onSave={handleCreate}
        close={() => setShowModal(false)}
      />
    )}
    </>
  )
}

export default ProductList
