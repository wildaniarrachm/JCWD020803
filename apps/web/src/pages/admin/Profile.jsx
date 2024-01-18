import { AdminProfile } from '../../components/admin/admin-profile/Index';
import { Layout } from '../../components/admin/dashboard/Index';


export const AdminProfilePage = () => {
  return (
    <>
      <Layout>
        <div className='bg-main-light pl-20 pt-8'>
            <AdminProfile/>
            </div>
      </Layout>
    </>
  );
}
