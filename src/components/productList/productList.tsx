import { Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { useProductContext } from "../../context/productContext";
import { useState } from "react";
import AlertMessage from "../toast/toast";
import { Link } from "react-router-dom";
import { addProduct } from "../../services/services";
import ProductModal from "../modal/productModal";
import type { Product } from "../../models/product";
import BarChart from "../BarChart/BarChart";
import PaginationList from "../pagination/pagination";
import { usePagination } from "../../hook/usePagination";

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
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { currentPage, currentItems: currentProducts, setCurrentPage } = usePagination(products, 8);
 

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
    setLoadingId(id)
    try{
   await handleDelete(id);
   setToastMessage(`Producto numero ${id} eliminado correctamente`);
   setShowToast(true);
    }finally {
    setLoadingId(null); // termino el loading
  }
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
         {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <div className="d-flex gap-1 justify-content-end">
                <Button disabled={loadingId === product.id} variant="outline-danger" size="sm"   
                  onClick={() => handleDeleteWithToast(product.id)}>
                    Delete
                    {loadingId === product.id &&  
                      <Spinner animation="border" variant="danger" size="sm"/>
                    }
                  </Button>
                <Link to={`/product/${product.id}`}>
                  <Button variant="outline-primary" size="sm">Details</Button>
                </Link>
                </div>
              </td>
            </tr>
        ))}
      </tbody>
      </Table>
       <PaginationList
              totalItems={products.length}
              itemsPerPage={8}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
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
