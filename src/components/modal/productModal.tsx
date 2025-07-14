import React, { useState } from "react";
import type { Product } from "../../models/product";
import { Modal, Button, Form } from "react-bootstrap";

interface ProductModalProps {
  product: Product;
  mode: "edit" | "create";
  onSave: (product: Product) => void;
  close: () => void;
}

function ProductModal({ product, mode, onSave, close }: ProductModalProps) {

  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control name="image" value={formData.image} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stock" type="number" value={formData.stock} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control name="category" value={formData.category} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Detalles</Form.Label>
            <Form.Control name="details" value={formData.details} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === "edit" ? "Guardar cambios" : "Crear producto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
