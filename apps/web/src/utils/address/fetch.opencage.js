import axios from 'axios';

export const fetchOpenCage = async (data) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=+${data?.lat},${
        data?.lng
      }&key=${import.meta.env.VITE_OPENCAGE_KEY}&language=id&pretty=1`,
    );
    return response;
  } catch (error) {
    return error
  }
};
