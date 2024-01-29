import * as Yup from 'yup'
import { api } from '../../libs/server.api'


export const addProduct = async (data) => {
    try{
        const response = await api.post(`/product/add-product`, data)
        console.log(response, 'ini respon product');
        alert (response?.data)
    }catch(error){
        console.log(error);
    }
}

export const addProductSchema = Yup.object({
    product_name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Category should contain only letters')
    .required('this field can not be empty')
})