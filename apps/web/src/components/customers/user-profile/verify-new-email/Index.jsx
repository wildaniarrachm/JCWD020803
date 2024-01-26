import { Layout } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';
import { verifyAccount } from '../../../../utils/customer/change.email';

export const VerifyNewEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handleClick = async () => {
    const response = await verifyAccount(token);
    console.log(response);
    navigate('/');
    window.location.reload();
  };

  return (
    // <Layout>
    <div className="flex flex-col h-[300px]  items-center justify-center">
      <div>
        <h1 className="font-poppins">Verification Success</h1>
        <div className="py-8">
          <FcApproval className="mx-auto" size={50} />
        </div>
        <button
          className="bg-main-pink font-poppins text-sm rounded-md p-1 text-white w-full"
          onClick={handleClick}
        >
          Back to dashboard
        </button>
      </div>
    </div>
    // </Layout>
  );
};
