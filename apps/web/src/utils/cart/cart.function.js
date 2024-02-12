import { api } from '../../libs/server.api';
import { useEffect, useState } from 'react';

export const CartFunction = () => {
  const [cartData, setCartData] = useState([]);

  const token = localStorage.getItem('token');

  const fetchData = async (cartId) => {
    try {
      const response = await api.get(`cart/active?id=${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartData(response.data.data);
    } catch (err) {
      return err;
    }
  };

  const addToCart = async (productId, BranchId) => {
    try {
      const userToken = localStorage.getItem('token');

      await api.post(
        `cart/add-to-cart`,
        { productId: productId, BranchId: BranchId },
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
      await api.delete(`cart/delete-cart-detail/${cartDetailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      await api.delete(`cart/delete-all/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem('cartData');
      fetchData();
    } catch (err) {
      return err;
    }
  };

  const handleQuantityChange = async (cartDetailId, newQuantity, action) => {
    try {
      await api.put(
        `cart/update-cart/${cartDetailId}`,
        {
          action,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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
