import Discount from "../models/discount.model"



export const addDiscount = async (req, res) => {
    try{

    }catch (error){
        console.log(error);
        return res.status(400).send({message: error.message})
    }
}