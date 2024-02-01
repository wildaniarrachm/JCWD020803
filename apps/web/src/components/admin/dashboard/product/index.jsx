import { Card, Typography } from '@material-tailwind/react';
import { TableProducts } from './table-product';
import { AddProducts } from './add-product';

const TABLE_HEAD = [
  'Name',
  'Category',
  'SubCategory',
  'Stock',
  'SubCategory',
  'Price',
  'Weight',
  '',
];

const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18',
  },
  {
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18',
  },
  {
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17',
  },
  {
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
];

export const ProductManagement = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="flex justify-end">
        <AddProducts />
      </div>
      <TableProducts />
    </div>
  );
};
