import { api } from "../../libs/server.api"

export const getCustomerById = async (data)=>{
    try {
        const response = await api.get(`customer/get-customer-by-id/${data}`)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}