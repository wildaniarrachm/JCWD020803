import { Input, Option, Select } from '@material-tailwind/react';

export const FormEditBranch = ({
  formik,
  onChangeProvince,
  provinces,
  cities,
  admins,
}) => {
  return (
    <div className="grid grid-cols-3 gap-10 px-4">
      <Input
        name="branch_name"
        label="Branch name"
        value={formik?.values?.branch_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="address"
        label="Branch address"
        value={formik?.values?.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="store_contact"
        label="Branch contact"
        value={formik?.values?.store_contact}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Select label="Branch province" onChange={(e) => onChangeProvince(e)}>
        {provinces?.data?.map((provinces) => (
          <Option key={provinces?.province_id} value={provinces?.province_id}>
            {provinces?.province}
          </Option>
        ))}
      </Select>
      <Select
        label="Branch cities"
        disabled={provinces?.idProvince === undefined}
        onChange={(e) => formik.setFieldValue('city_id', e)}
      >
        {cities?.data?.map((cities) => (
          <Option key={cities?.city_id} value={cities?.city_id}>
            {cities?.type}{' '}
            {cities?.city_name ? cities?.city_name : cities?.city}
          </Option>
        ))}
      </Select>
      <Select
        label="Supervisor"
        onChange={(e) => formik.setFieldValue('AdminId', e)}
      >
        {admins?.data?.map((admin) => (
          <Option key={admin?.id} value={admin?.id}>
            {admin?.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
