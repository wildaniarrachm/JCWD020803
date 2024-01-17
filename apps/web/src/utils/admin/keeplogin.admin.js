import { api } from "../../libs/server.api";
import { setAdminData } from "../../redux/admin.slice";

export const keepLoginAdmin = async (dispatch, tokenAdmin) => {
    try {
      const response = await api.get(`admins/admin/keep-login`, {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
        },
      });
      console.log(response);
      dispatch(setAdminData(response.data.admin));
    } catch (err) {
      console.log(err);
    }
  };