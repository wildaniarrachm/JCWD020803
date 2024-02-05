import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const shipmentFunction = (
  selectedPaymentMethod,
  shipment_fee,
  shipment_method,
) => {
  const [shipmentData, setShipmentData] = useState([]);
  const [dibatalkan, setDibatalkan] = useState([]);
  const [waitingProof, setWaitingProof] = useState([]);
  const [waitingConfirmed, setWaitingConfirmed] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShipmentData(response.data.response);
    } catch (err) {
      return err;
    }
  };

  const fetchByDate = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaction/date/${date}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShipmentData(response.data.data);
    } catch (err) {
      return err;
    }
  };

  const waitingPaymentProof = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const waitingPaymentOrders = response.data.response.filter(
        (order) => order.status === 'Waiting Payment',
      );
      setWaitingProof(waitingPaymentOrders);
    } catch (err) {
      return err;
    }
  };

  const waitingPaymentConfirmed = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const waitingPaymentConfirmedOrders = response.data.response.filter(
        (order) => order.status === 'Waiting Payment Confirmation',
      );
      setWaitingConfirmed(waitingPaymentConfirmedOrders);
    } catch (err) {
      return err;
    }
  };

  const orderCancelled = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const canceledOrders = response.data.response.filter(
        (order) => order.status === 'Order Cancelled',
      );
      setDibatalkan(canceledOrders);
    } catch (err) {
      return err;
    }
  };

  const fetchById = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaction/${transactionId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTransactionDetail({
        totalHarga: response.data.data.total,
      });
    } catch (err) {
      return err;
    }
  };

  const postData = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/transaction',
        {
          PaymentMethodId: selectedPaymentMethod,
          shipment_fee: shipment_fee,
          shipment_method: shipment_method,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate('/customer-dashboard/profile/order-history');
      fetchData();
    } catch (err) {
      return err;
    }
  };

  const handleSearchById = () => {
    const results = shipmentData.filter(
      (order) => order.id.toString() === searchTerm,
    );
    setSearchResult(results);
  };

  const handleResetFilters = () => {
    setSearchResult([]);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    fetchData,
    fetchByDate,
    fetchById,
    shipmentData,
    waitingConfirmed,
    waitingPaymentConfirmed,
    waitingProof,
    waitingPaymentProof,
    dibatalkan,
    orderCancelled,
    searchResult,
    setSearchResult,
    setSearchTerm,
    transactionDetail,
    postData,
    handleSearchById,
    handleResetFilters,
  };
};
