import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router'
import { customerRouter } from './routers/customer.route';


const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admin', adminRouter)
router.use('/customer', customerRouter)


// add another router here ...

export default router;
