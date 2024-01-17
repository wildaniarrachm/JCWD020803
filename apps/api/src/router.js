import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router'
import { customerRouter } from './routers/customer.route';
import { productRouter } from './routers/product.router';


const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admins', adminRouter)
router.use('/customer', customerRouter)
router.use('/products', productRouter)

// add another router here ...

export default router;
