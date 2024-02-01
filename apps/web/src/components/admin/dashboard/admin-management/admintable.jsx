import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  CardFooter,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { RegisterAdmin } from './registeradminmodal';
import { getAllAdmin } from '../../../../utils/admin/get.all.admins';

const TABLE_HEAD = ['Admin', 'Username', 'Branch', 'Email', 'Joined', ' ', ''];

export function AdminTable() {
  const [open, setOpen] = useState(false);
  const [admins, setAdmins] = useState();
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const handleOpen = () => {
    setOpen((open) => !open);
  };

  const getAdmin = async () => {
    const response = await getAllAdmin(tokenAdmin);
    setAdmins(response?.data?.adminData);
  };

  useEffect(() => {
    getAdmin();
  }, []);
  console.log(admins);
  return (
    <>
      <Card className="h-full w-full bg-main-light">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-main-light "
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Admins list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See your admins' information
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleOpen}
                className="flex items-center gap-3 bg-main-blue font-poppins"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Admin
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end  gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins?.map((admins) => {
                const isLast = admins?.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';
                return (
                  <tr key={admins?.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-poppins font-bold"
                      >
                        {admins?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-poppins font-bold"
                      >
                        {admins?.username}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" color="blue-gray">
                          {admins?.Branch?.branch_name}
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          {admins?.Branch?.store_contact}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-poppins font-bold"
                          >
                            {admins?.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-poppins font-bold"
                      >
                        {new Date(admins?.createdAt).toLocaleString('GMT', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Admin">
                        <IconButton
                          variant="text"
                          // onClick={() => navigate(`/admins/edit/${admins?.id}`)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Delete admin">
                        <IconButton
                          variant="text"
                          // onClick={() => handleDeleted(admins?.id)}
                        >
                          <FaRegTrashAlt size={20} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <RegisterAdmin open={open} handleOpen={handleOpen} />
    </>
  );
}
