import { useParams } from 'react-router-dom';
import { FormSetPassword } from './Form';

export const SetPassword = () => {
  const { token } = useParams();

  return (
    <div className="h-[500px] flex justify-center items-center">
      <FormSetPassword token={token} />
    </div>
  );
};
