import { Router } from 'express';
import {
  addBranch,
  deleteBranch,
  editBranch,
  getAllBranch,
  getBranchById,
  getDistanceBranch,
  getHeadBranch,
} from '../controllers/branch.controller';
import {
  verifyAdminToken,
  verifyIsSuperAdmin,
} from '../middleware/admin.auth.middleware';

const branchRouter = Router();

branchRouter.get('/', getAllBranch);
branchRouter.get('/head-branch', getHeadBranch);
branchRouter.get('/distance', getDistanceBranch);
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
