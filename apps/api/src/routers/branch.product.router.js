import { Router } from 'express';
import { getProductByBranch } from '../controllers/branch.product.controller';

const branch_productRouter = Router();

branch_productRouter.get('/:id', getProductByBranch);
export { branch_productRouter };
