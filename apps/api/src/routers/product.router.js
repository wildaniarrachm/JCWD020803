import { Router } from "express";
import {
    addProduct, deleteProduct, editProduct, getAllProducts
} from "../controllers/product.controller"
import { productImage } from "../middleware/multer.middleware";
import { verifyAdminToken } from "../middleware/admin.auth.middleware";

const productRouter = Router();

productRouter.post('/add-product', productImage().single("product_image"), addProduct)
productRouter.patch('/edit-product', editProduct)
productRouter.get('/get-product', getAllProducts)
productRouter.delete('/delete-product', deleteProduct)

export {productRouter}