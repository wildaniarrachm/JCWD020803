import * as Yup from 'yup'
import { api } from '../../libs/server.api'

export const addCategory = async (data) => {
    try{
        const response = await api.post('/category/add-category', data)
        alert (response?.data)
    } catch(error){
        console.log(error);
    }
}

export const getAllCategories = async () => {
    try{
        const response = await api.get(`/category/`, data)
    } catch (error){
        console.log(error);
    }
}


export const addCategorySchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Category should contain only letters')
    .required('this field can not be empty')
})