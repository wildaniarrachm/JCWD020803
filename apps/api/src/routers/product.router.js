import { Router } from 'express';
import {
  addIntoBranch,
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProductOutsideBranch,

} from '../controllers/product.controller';
import {
  verifyAdminToken,
  verifyIsSuperAdmin,
} from '../middleware/admin.auth.middleware';
import { productImageUpload } from '../middleware/product.multer.middleware';

const productRouter = Router();

productRouter.get('/', verifyAdminToken, getProduct);
productRouter.get('/outside', verifyAdminToken, getProductOutsideBranch);
productRouter.post('/add-to-branch', verifyAdminToken, addIntoBranch)
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
