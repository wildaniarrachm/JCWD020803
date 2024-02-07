import { Router } from 'express';
import {
  getAllCategory,
  getSubCategory,
} from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategory);
categoryRouter.get('/:id', getSubCategory);

export { categoryRouter };
