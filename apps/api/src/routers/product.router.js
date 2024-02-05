import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from '../controllers/product.controller';
import {
  verifyAdminToken,
  verifyIsSuperAdmin,
} from '../middleware/admin.auth.middleware';
import { productImageUpload } from '../middleware/product.multer.middleware';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.post(
  '/',
  verifyAdminToken,
  verifyIsSuperAdmin,
  productImageUpload().single('file'),
  addProduct,
);
productRouter.patch('/edit-product', editProduct);
productRouter.delete('/delete-product', deleteProduct);

export { productRouter };
