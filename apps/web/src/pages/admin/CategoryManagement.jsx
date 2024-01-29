import { Layout } from '../../components/admin/dashboard/Index';
import { AdminTable } from '../../components/admin/dashboard/admin-management/admintable';
import { CategoryManagement } from '../../components/admin/dashboard/product/product-category/category/Index';

export const CategoryPage = () => {
  return (
    <>
      <Layout>
        <CategoryManagement />
      </Layout>
    </>
  );
};
