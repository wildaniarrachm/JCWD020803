import { Input } from '@material-tailwind/react';

export const FormEditEmail = ({ email }) => {
  return (
    <div>
      <Input
        label="Email"
        type="email"
        variant="outlined"
        placeholder={email}
      />
    </div>
  );
};
