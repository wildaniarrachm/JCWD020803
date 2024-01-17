import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// export const addCustomer = async (data) => {
//     try {
//       const add = await api.post(`customer/register-customer`, data);
//       alert(add?.data);
//     } catch (error) {
//       console.log(error);
//       alert(error?.response?.data);
//     }
//   };

// export const registerAdmin = async (data) => {
//     try{

//     }catch (error){
//         console.log(error);
//     }
// }