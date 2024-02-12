import { Router } from 'express';
import {
  getProductByBranch,
  removeProductFromBranch,
} from '../controllers/branch.product.controller';

const branch_productRouter = Router();

branch_productRouter.get('/', getProductByBranch);
branch_productRouter.delete('/:id', removeProductFromBranch);
export { branch_productRouter };
