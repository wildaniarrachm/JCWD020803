import { Input } from '@material-tailwind/react';

export const FormEditEmail = ({
  email,
  handleChange,
  handleBlur,
  value,
  error,
}) => {
  return (
    <div>
      <Input
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={email}
        error={error}
      />
      {error && error && (
        <div className="text-red-500 text-[12px] font-poppins">{error}</div>
      )}
    </div>
  );
};
