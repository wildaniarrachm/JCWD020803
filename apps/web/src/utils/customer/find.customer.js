import axios from 'axios';

export const findCustomer = async (data) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/customer/${data?.email}`,
    );
    alert(response?.data);
  } catch (error) {
    console.log(error);
  }
};
