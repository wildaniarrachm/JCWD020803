import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router'
import { customerRouter } from './routers/customer.route';
import { productRouter } from './routers/product.router';
import { categoryRouter } from './routers/category.router'
import { subCategoryRouter } from './routers/sub_category.router';
import { discountRouter } from './routers/discount.router';


const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admins', adminRouter)
router.use('/customer', customerRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/sub-category', subCategoryRouter)
router.use('/discount', discountRouter)


// add another router here ...

export default router;
