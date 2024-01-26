import { Card } from '@material-tailwind/react';
import { HeaderBranch } from './headers';
import { BodyBranch } from './body';
import { FooterBranch } from './footer';
import { getAllBranch } from '../../../../utils/branch/get.all.branch';
import { useEffect, useState } from 'react';

const TABS = [
  {
    label: 'All',
    value: false,
  },
  {
    label: 'Deleted',
    value: true,
  },
];

const TABLE_HEAD = [
  'Branch',
  'Location',
  'Status',
  'Supervisor Store',
  'Head Store',
  '',
  '',
];

export const Branch = () => {
  const [branch, setBranch] = useState();
  const [fill, setFill] = useState(false);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const getBranch = async () => {
    const response = await getAllBranch(tokenAdmin);
    if (response?.status === 200) {
      setBranch(response?.data?.result);
    }
  };
  useEffect(() => {
    getBranch();
  }, []);
  console.log(fill);
  return (
    <Card className=" w-full bg-main-light">
      <HeaderBranch TABS={TABS} setFill={setFill} />
      <BodyBranch TABLE_HEAD={TABLE_HEAD} branch={branch} />
      <FooterBranch />
    </Card>
  );
};
