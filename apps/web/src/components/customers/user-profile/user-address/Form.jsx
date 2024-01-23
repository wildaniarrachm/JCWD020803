import { Input, Option, Select } from '@material-tailwind/react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import PropTypes from 'prop-types';
import Flags from 'react-phone-number-input/flags';
import { useEffect, useState } from 'react';

export const FormNewAddress = ({
  province,
  cities,
  setIdProvince,
  setIdCities,
  onChange,
  onBlur,
  value,
  handlePhoneChange,
  idProvince,
  data,
  error,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [newProvinces, setNewProvinces] = useState('');
  const handleDisabled = () => {
    if (idProvince === '' || idProvince === undefined) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleNewData = () => {
    if (data) {
      let arr = data?.values();
      for (const value of arr) {
        setNewProvinces(value?.components?.state);
      }
    }
  };
  const filteredProvinces = newProvinces
    ? province?.filter((province) => province?.province === newProvinces)
    : province;

  useEffect(() => {
    handleDisabled();
    handleNewData();
  }, [idProvince][data]);
  return (
    <div className="relative -top-3 grid grid-cols-1 w-full h-[300px] laptop:w-full laptop:flex laptop:flex-col laptop:gap-5">
      <Select
        variant="standard"
        label="Choose the province."
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={(e) => setIdProvince(e)}
      >
        {filteredProvinces?.map((provinces) => (
          <Option key={provinces?.province_id} value={provinces?.province_id}>
            {provinces?.province}
          </Option>
        ))}
      </Select>
      <Select
        variant="standard"
        disabled={disabled}
        label="Select the city or district."
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={(e) => setIdCities(e)}
      >
        {cities?.map((cities) => (
          <Option key={cities?.city_id} value={cities?.city_id}>
            {cities?.type} {cities?.city_name}
          </Option>
        ))}
      </Select>
      <Input
        name="street"
        label="Detail address, Including the street name, house/apartment number, etc."
        size="sm"
        className="w-full"
        variant="standard"
        onChange={onChange}
        onBlur={onBlur}
        value={value.street}
        error={error.street}
      />
      {error.street && error.street && (
        <div className="text-red-500 text-[12px] font-poppins">
          {error.street}
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 laptop:grid laptop:grid-cols-2 laptop:gap-3">
        <Input
          name="received_name"
          label="Received name"
          variant="standard"
          size="sm"
          onChange={onChange}
          onBlur={onBlur}
          value={value.received_name}
          error={error.received_name}
        />
        {error.received_name && error.received_name && (
          <div className="text-red-500 text-[12px] font-poppins">
            {error.received_name}
          </div>
        )}
        <PhoneInput
          defaultCountry="ID"
          international="true"
          name="phone_number"
          flags={Flags}
          value={value.phone_number}
          onChange={handlePhoneChange}
          onBlur={onBlur}
        />
      </div>
      <Input
        name="label"
        label="Label address: Home,office, etc"
        variant="standard"
        size="sm"
        onChange={onChange}
        onBlur={onBlur}
        value={value.label}
        error={error.label}
      />
      {error.label && error.label && (
        <div className="text-red-500 text-[12px] font-poppins">
          {error.label}
        </div>
      )}
    </div>
  );
};

FormNewAddress.propTypes = {
  province: PropTypes.array,
  cities: PropTypes.array,
  setIdCities: PropTypes.func,
  setIdProvince: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.func,
  handlePhoneChange: PropTypes.func,
  idProvince: PropTypes.func,
  data: PropTypes.array,
  error:PropTypes.func
};
