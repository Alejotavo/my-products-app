import { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../models/product';
import { getProducts, addProduct as apiAddProduct, deleteProduct } from '../services/../services/services';


interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
   handleDelete: (id: number) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);


export const ProductProvider = ({ children }: { children: React.ReactNode }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error al obtener productos');
    } finally {
      setLoading(false);
    }
  };


    const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await apiAddProduct(product);
      setProducts(prev => [...prev, newProduct]); 
    } catch (err) {
      setError('Error al crear producto');
    }
  };

  
  const handleDelete  = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      alert('Error al eliminar el producto');
    }
  };

    useEffect(() => {
    fetchProducts();
  }, []);


    return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts, addProduct, handleDelete  }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe usarse dentro de ProductProvider');
  }
  return context;
};
