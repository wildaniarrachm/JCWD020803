import { Router } from "express";
import {
    addProduct, deleteProduct, editProduct, getAllProducts
} from "../controllers/product.controller"

const productRouter = Router();

productRouter.post('/add-product', addProduct)
productRouter.patch('/edit-product', editProduct)
productRouter.get('/get-product', getAllProducts)
productRouter.delete('/delete-product', deleteProduct)

export {productRouter}