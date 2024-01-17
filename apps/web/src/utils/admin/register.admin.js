import * as Yup from 'yup'
import { api } from '../../libs/server.api'

export const addAdmin = async (data) => {
    try{
        const response = await api.post(`/admins/register-admin`, data);
        alert (response?.data);
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const registSchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters')
    .required("this field can not be empty"),
    username: Yup.string().required('username is required'),
    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
})