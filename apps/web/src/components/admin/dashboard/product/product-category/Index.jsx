import { AddCategory } from './AddCategory';
import { CategoryTable } from './CategoryTable';

export const CategoryManagement = () => {
  return (
    <>
      <div className='bg-main-light h-full w-full rounded-lg'>
        <AddCategory />
        <CategoryTable />
      </div>
    </>
  );
};
