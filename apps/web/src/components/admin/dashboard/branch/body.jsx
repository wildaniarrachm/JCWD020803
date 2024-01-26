import { PencilIcon } from '@heroicons/react/24/outline';
import { FcCheckmark } from 'react-icons/fc';
import {
  Avatar,
  CardBody,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteBranch } from '../../../../utils/branch/deleted.branch';
import swal from 'sweetalert';

export const BodyBranch = ({ TABLE_HEAD, branch }) => {
  const navigate = useNavigate();
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const handleDeleted = async (id) => {
    const wilDeleted = await swal({
      title: 'Are you sure?',
      text: 'Dont worry, once deleted, you will be able to recover this branch.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (wilDeleted) {
      try {
        const response = await deleteBranch(id, tokenAdmin);
        swal(response?.data, {
          icon: 'success',
        });
      } catch (error) {
        swal(error?.message, {
          icon: 'error',
        });
      }
    } else {
      swal('Your branch is safe!');
    }
  };
  const filterBranch = branch?.filter((branch) => branch?.isDeleted === false);
  return (
    <>
      <CardBody className="overflow-scroll px-0 font-poppins">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-white p-4"
                >
                  <Typography
                    variant="small"
                    color="black"
                    className="font-poppins font-bold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterBranch?.map((branch) => {
              const isLast = branch?.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';
              return (
                <tr key={branch?.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-bold"
                    >
                      {branch?.branch_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-bold"
                    >
                      {branch?.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`${
                        branch?.isDisabled === true
                          ? 'text-main-red'
                          : 'text-green-500'
                      } font-poppins font-bold`}
                    >
                      {branch?.isDisabled === true ? 'Closed' : 'Open'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={branch?.Admin?.image} size="sm" />
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-poppins font-bold"
                        >
                          {branch?.Admin?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-poppins font-bold"
                        >
                          {branch?.Admin?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    {branch?.head_store === true ? (
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <FcCheckmark size={25} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton
                        variant="text"
                        onClick={() => navigate(`/branch/edit/${branch?.id}`)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete branch">
                      <IconButton
                        variant="text"
                        onClick={() => handleDeleted(branch?.id)}
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
    </>
  );
};
