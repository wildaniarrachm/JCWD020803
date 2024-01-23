import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { useSelector } from 'react-redux';
import { getCityByProvince } from '../../../../utils/address/get.city';
import { editAddress } from '../../../../utils/address/edit.address';
import { getCityAndProvinceById } from '../../../../utils/address/get.byid';
import { addCities } from '../../../../utils/address/add.address.customer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const FormEditAddress = ({ addressData, handleChange }) => {
  const [idProvince, setIdProvince] = useState('');
  const [load, setLoad] = useState(false);
  const [idCities, setIdCities] = useState('');
  const [cities, setCities] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const provinces = useSelector((state) => state.provinces.value);
  const getCities = async () => {
    setLoad(true);
    if (idProvince) {
      const response = await getCityByProvince(idProvince);
      if (response?.data?.rajaongkir?.results) {
        setCities(response?.data?.rajaongkir?.results);
        setLoad(false);
      }
    }
    // setLoad(false);
  };
  const handleEditAddress = async () => {
    const willEdited = await swal({
      title: 'Edit this address?',
      text: 'Make sure you have filled out all forms correctly',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    if (willEdited) {
      try {
        const results = await getCityAndProvinceById(idCities, idProvince);
        const add = await addCities(results?.data?.rajaongkir?.results);
        const newData = {
          ...addressData,
          city_id: add?.data?.result?.city_id,
        };
        const response = await editAddress(newData, token);
        if (response?.status === 200) {
          swal(response?.data, {
            icon: 'success',
          });
          navigate(-1);
        }
      } catch (error) {
        swal(error?.message, {
          icon: 'error',
        });
      }
    } else {
      swal('Your address not be edited!');
    }
  };
  useEffect(() => {
    getCities();
  }, [idProvince]);
  return (
    <div className="px-[3%] pb-5">
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-5 laptop:px-7 py-[3%]">
        <Input
          name="street"
          label="Street"
          value={addressData?.street}
          onChange={handleChange}
        />
        <Input
          label="Label address"
          name="label_address"
          onChange={handleChange}
          value={addressData?.label_address}
        />
        <Input
          label="Receiver name"
          name="received_name"
          onChange={handleChange}
          value={addressData?.received_name}
        />
        <PhoneInput
          defaultCountry="ID"
          international="true"
          name="phone_number"
          value={addressData.phone_number}
          onChange={handleChange}
        />
        <Select label="Select Provinces" onChange={(e) => setIdProvince(e)}>
          {provinces?.map((province) => (
            <Option key={province?.province_id} value={province?.province_id}>
              {province?.province}
            </Option>
          ))}
        </Select>
        {cities?.length > 0 ? (
          <Select
            label="Select Cities"
            onChange={(e) => setIdCities(e)}
            disabled={!idProvince}
          >
            {cities?.map((city) => (
              <Option key={city?.city_id} value={city?.city_id}>
                {city?.type} {city?.city_name}
              </Option>
            ))}
          </Select>
        ) : null}
      </div>
      <div className="w-[80%] mx-auto">
        {load === true ? (
          <Button disabled fullWidth>
            <Spinner className="mx-auto" />
          </Button>
        ) : (
          <Button onClick={handleEditAddress} fullWidth>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
