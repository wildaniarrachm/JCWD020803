import { Router } from 'express';
import {
    registerAdmin
} from '../controllers/admin.controller'

const adminRouter = Router ();

adminRouter.post('/register-admin', async (req, res) => {
    const result = await registerAdmin(req?.body, res);
    console.log(result);
    res.status(result?.statusCode)
});

export {adminRouter};

