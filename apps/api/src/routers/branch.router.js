import { Router } from 'express';
import {
  addBranch,
  deleteBranch,
  editBranch,
  getAllBranch,
  getBranchById,
} from '../controllers/branch.controlle';
import {
  verifyAdminToken,
  verifyIsSuperAdmin,
} from '../middleware/admin.auth.middleware';

const branchRouter = Router();

branchRouter.get('/', verifyAdminToken, verifyIsSuperAdmin, getAllBranch);
branchRouter.post('/', verifyAdminToken, verifyIsSuperAdmin, addBranch);
branchRouter.patch('/', verifyAdminToken, verifyIsSuperAdmin, editBranch);
branchRouter.get(
  '/delete/:id',
  verifyAdminToken,
  verifyIsSuperAdmin,
  deleteBranch,
);
branchRouter.get('/:id', verifyAdminToken, verifyIsSuperAdmin, getBranchById);

export { branchRouter };
