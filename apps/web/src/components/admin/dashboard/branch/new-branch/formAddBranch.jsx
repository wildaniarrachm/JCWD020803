import { Input, Option, Select } from '@material-tailwind/react';

export const FormAddBranch = ({
  provinces,
  setProvinces,
  cities,
  setCities,
  admins,
  setAdmins,
  handleChange,
  value,
  onBlur,
}) => {
  return (
    <div className=" grid grid-cols-2 gap-10">
      <Input
        name="branch_name"
        label="Branch name"
        placeholder="Example: EZ Mart Bandung"
        variant="static"
        onChange={handleChange}
        onBlur={onBlur}
        value={value?.branch_name}
      />
      <Input
        name="address"
        label="Branch address"
        placeholder="Example: Jalan raya Bandung no 1"
        variant="static"
        onChange={handleChange}
        onBlur={onBlur}
        value={value?.address}
      />
      <Input
        label="Branch contact"
        name="store_contact"
        placeholder="Example: +6281234567"
        variant="static"
        onChange={handleChange}
        onBlur={onBlur}
        value={value?.store_contact}
      />
      <Select
        label="Branch province"
        onChange={(e) => setProvinces({ data: provinces?.data, idProvince: e })}
      >
        {provinces?.data?.map((province) => (
          <Option key={province?.province_id} value={province?.province_id}>
            {province?.province}
          </Option>
        ))}
      </Select>
      <Select
        label="Branch city"
        disabled={provinces?.idProvince === undefined}
        onChange={(e) => setCities({ data: cities?.data, idCities: e })}
      >
        {cities?.data?.map((city) => (
          <Option key={city?.city_id} value={city?.city_id}>
            {city?.type} {city?.city_name ? city?.city_name : city?.city}
          </Option>
        ))}
      </Select>
      <Select
        label="Supervisor branch"
        onChange={(e) => setAdmins({ data: admins?.data, idAdmins: e })}
        size="lg"
      >
        {admins?.data?.map((admin) => (
          <Option key={admin?.id} value={admin?.id}>
            <div className="flex gap-5 items-center font-poppins text-sm">
              <img
                src={admin?.image}
                alt="images admin"
                className="ml-2 pt-0.5 h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p>{admin?.name}</p>
                <p>{admin?.email}</p>
              </div>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
};
