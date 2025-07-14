import axios from 'axios';
import type { Product } from '../models/product';
import type { User } from '../models/user';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`https://686d6a11c9090c495386453d.mockapi.io/products`);
    return response.data;
  } catch (error) {
    console.error('Error on get Users:', error);
    throw error;
  }
}


export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`https://686d6a11c9090c495386453d.mockapi.io/users`);
    return response.data;
  } catch (error) {
    console.error('Error on get Users:', error);
    throw error;
  }
}



export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await axios.post<Product>(`https://686d6a11c9090c495386453d.mockapi.io/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw new Error('No se pudo crear el producto.');
  }
}

export async function addUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await axios.post<User>(`https://686d6a11c9090c495386453d.mockapi.io/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw new Error('No se pudo crear el producto.');
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await axios.delete(`https://686d6a11c9090c495386453d.mockapi.io/products/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw new Error('No se pudo eliminar el producto.');
  }
}


export const updateProduct = async (updatedProduct: Product) => {
 try {
    const response = await axios.put<Product>(
      `https://686d6a11c9090c495386453d.mockapi.io/products/${updatedProduct.id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${updatedProduct.id}:`, error);
    throw new Error('No se pudo actualizar el producto.');
  }
};