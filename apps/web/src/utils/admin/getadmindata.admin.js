import { api } from '../../libs/server.api'

export const getAdminData = async (tokenAdmin) => {
    try{
        const response = await api.get(`admin/get-admin`, {
            headers: {
                Authorization: `Bearer ${tokenAdmin}`,
              },
        });
        console.log(response, 'ini response');
        return response
    } catch (error){
        console.log(error);
    }
}
