import { rajaOngkir } from './raja.ongkir';

export const getShippingCost = async (req, res) => {
  const data = req?.body;
  console.log(data);
  try {
    const results = await rajaOngkir.post(`cost`, data);
    res.status(200).json(results?.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
