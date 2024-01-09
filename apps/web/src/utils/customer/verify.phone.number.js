import { api } from '../../libs/server.api';

export const verifyPhoneNumber = async (token, navigate, username) => {
  try {
    const response = await api.patch(`customer/verify-phone-number`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.status === 200) {
      alert(response?.data);
      navigate(`/customer-dashboard/profile/${username}`);
      window.location.reload();
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
