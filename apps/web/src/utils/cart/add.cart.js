import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product');
        setProducts(response.data);
      } catch (err) {
        return err;
      }
    };

    fetchData();
  }, []);

  return products;
};
