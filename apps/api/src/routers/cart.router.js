import { Router } from 'express';
import {
  addToCart,
  branchProduct,
  deleteAllCarts,
  deleteCartDetail,
  getActive,
  getAllProductsInCart,
  updateCart,
} from '../controllers/cart.controller';
import { verifyToken } from '../middleware/customer.auth.middleware';

const cartRouter = Router();

// cartRouter.use(verifyToken);
cartRouter.get('/', verifyToken, getAllProductsInCart);
cartRouter.get('/active', verifyToken, getActive);
cartRouter.post('/add-to-cart', verifyToken, addToCart);
cartRouter.delete('/delete-all', verifyToken, deleteAllCarts);
cartRouter.delete(
  '/delete-cart-detail/:cartDetailId',
  verifyToken,
  deleteCartDetail,
);
cartRouter.put('/update-cart/:cartDetailId', verifyToken, updateCart);

export { cartRouter };
