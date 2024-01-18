import { Router } from 'express';
import {
    getAdminbyToken,
    loginAdmin,
    registerAdmin,
    addSuperAdmin,
    keepLogin,
    getAdmin,
    inputPassword,
    forgotPasswordAdmin,
    resetPassword
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
adminRouter.post('/forgot-password', forgotPasswordAdmin)
adminRouter.patch('/reset-password', verifyAdminToken, resetPassword)


export {adminRouter};

