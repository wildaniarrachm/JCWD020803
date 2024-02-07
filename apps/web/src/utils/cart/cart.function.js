import axios from 'axios';
import { useEffect, useState } from 'react';

export const CartFunction = () => {
  const [cartData, setCartData] = useState([]);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/cart/active',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCartData(response.data.data);
    } catch (err) {
      return err;
    }
  };

  const addToCart = async (productId) => {
    try {
      const userToken = localStorage.getItem('token');

      await axios.post(
        'http://localhost:8000/api/cart/add-to-cart',
        {
          productId: productId,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      );
      fetchData();
    } catch (err) {
      return err;
    }
  };

  const handleDeleteItem = async (cartDetailId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/cart/delete-cart-detail/${cartDetailId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const updatedCartData = cartData.filter(
        (item) => item.Cart_detail.id !== cartDetailId,
      );
      setCartData(updatedCartData);
      localStorage.setItem('cartData', JSON.stringify(updatedCartData));
      fetchData();
    } catch (err) {
      return err;
    }
  };

  const deleteAllItems = async () => {
    try {
      await axios.delete('http://localhost:8000/api/cart/delete-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('cartData');
      fetchData();
    } catch (err) {
      return err;
    }
  };

  const handleQuantityChange = async (cartDetailId, newQuantity, action) => {
    try {
      await axios.put(
        `http://localhost:8000/api/cart/update-cart/${cartDetailId}`,
        {
          action,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchData();
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  return {
    cartData,
    addToCart,
    fetchData,
    handleDeleteItem,
    deleteAllItems,
    handleQuantityChange,
  };
};
