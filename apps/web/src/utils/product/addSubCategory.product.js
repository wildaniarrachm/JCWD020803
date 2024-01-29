import { api } from "../../libs/server.api";
import * as Yup from 'yup'


export const addSubCategory = async () => {
    try{
        const response = api.post(`/product`, data)
        alert (response?.data)
    }catch (error){
        console.log(error);
    }
};



export const addSubCategorySchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Subcategory should contain only letters')
    .required('this field can not be empty')
})