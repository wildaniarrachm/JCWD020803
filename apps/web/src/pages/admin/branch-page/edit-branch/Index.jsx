import { useParams } from 'react-router-dom';
import { Layout } from '../../../../components/admin/dashboard/Index';
import { EditBranch } from '../../../../components/admin/dashboard/branch/edit-branch/Index';

function EditBranchPage() {
  const params = useParams();
  console.log(params);
  return (
    <Layout>
      <EditBranch />
    </Layout>
  );
}
export default EditBranchPage;
