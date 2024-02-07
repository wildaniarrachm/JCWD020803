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

export const Branches = () => {
  const [branch, setBranch] = useState();
  const [fill, setFill] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const getBranch = async () => {
    const response = await getAllBranch(tokenAdmin, page);
    if (response?.status === 200) {
      setBranch(response?.data?.result);
      setTotalPages(response?.data?.totalPages);
      setPage(response?.data?.page);
    }
  };
  useEffect(() => {
    getBranch();
  }, [page]);
  return (
    <Card className=" w-full bg-main-light">
      <HeaderBranch TABS={TABS} setFill={setFill} />
      <BodyBranch TABLE_HEAD={TABLE_HEAD} branch={branch} />
      <FooterBranch
        setPage={setPage}
        page={page}
        totalPages={totalPages}
      />
    </Card>
  );
};
