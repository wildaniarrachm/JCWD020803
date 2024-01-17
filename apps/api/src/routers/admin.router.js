import { Router } from 'express';
import {
    getAdminbyToken,
    loginAdmin,
    registerAdmin,
    addSuperAdmin,
    keepLogin,
    getAdmin,
    inputPassword
} from '../controllers/admin.controller'
import { verifyAdminToken } from '../middleware/admin.auth.middleware'
import { checkRegister } from '../middleware/admin.validator.middleware';


const adminRouter = Router ();

adminRouter.post('/register/superadmin', addSuperAdmin)
adminRouter.post('/register-admin', checkRegister, registerAdmin);
adminRouter.post('/admin/login', loginAdmin)
adminRouter.get('/admin/keep-login', verifyAdminToken, keepLogin)
adminRouter.get('/admin/get-admin', verifyAdminToken, getAdmin)
adminRouter.post('/admin/create-password', verifyAdminToken, inputPassword)
adminRouter.get('/admin/create-password/:token', getAdminbyToken)

export {adminRouter};

