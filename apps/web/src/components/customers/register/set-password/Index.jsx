import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCustomerByToken } from '../../../../utils/customer/set-password.customer';
import { FormSetPassword } from './form';

export const SetPassword = () => {
  const { token } = useParams();
  const [dataUser, setDataUser] = useState();
  const getUser = async () => {
    try {
      const user = await getCustomerByToken(token);
      setDataUser(user?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-[500px] flex justify-center items-center">
      <FormSetPassword token={token} />
    </div>
  );
};
