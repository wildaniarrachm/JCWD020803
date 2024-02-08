import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { getCityByProvince } from '../../../../utils/address/get.city';
import { getCityAndProvinceById } from '../../../../utils/address/get.byid';
import { useFormik } from 'formik';
import {
  addCities,
  addressSchema,
  postAddress,
} from '../../../../utils/address/add.address.customer';
import { OpenAccordion } from './OpenAccordion';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export const AddAddress = ({ getAddress }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [geo, setGeo] = useState({ lat: '', lng: '' });
  const [cities, setCities] = useState([]);
  const [idProvince, setIdProvince] = useState('');
  const [idCities, setIdCities] = useState('');
  const province = useSelector((state) => state.provinces.value);
  const getCities = async () => {
    try {
      if (idProvince) {
        const response = await getCityByProvince(idProvince);
        if (response?.data?.rajaongkir?.results) {
          return setCities(response?.data?.rajaongkir?.results);
        } else {
          return setCities(response?.data?.Cities);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const getData = async (value) => {
    try {
      const response = await getCityAndProvinceById(idCities, idProvince);
      const add = await addCities(response?.data?.rajaongkir?.results);
      const newData = {
        street: value?.street,
        received_name: value?.received_name,
        label_address: value?.label,
        phone_number: value?.phone_number,
        city_id: add?.data?.result?.city_id,
        longitude: geo?.lng,
        latitude: geo?.lat,
      };
      const results = await postAddress(newData);
      handleOpen(null);
      if (results?.status === 200) {
        toast.success(results?.data, {
          autoClose: 3000,
          position: 'top-right',
        });
        window.location.reload();
      } else {
        toast.error(results?.response?.data, {
          autoClose: 3000,
          position: 'top-right',
        });
        window.location.reload();
      }
    } catch (error) {
      return error;
    }
  };

  const handlePhoneChange = (value) => {
    formik.setFieldValue('phone_number', value);
  };
  useEffect(() => {
    getAddress();
  }, []);
  useEffect(() => {
    getCities();
  }, [idProvince]);

  const formik = useFormik({
    initialValues: {
      street: '',
      received_name: '',
      label: '',
      phone_number: '',
      city_id: idCities,
    },
    validationSchema: addressSchema,
    onSubmit: (values, action) => {
      getData(values);
      action.resetForm();
    },
  });

  const handleDrag = (e) => {
    setGeo({
      lat: e?.lat,
      lng: e?.lng,
    });
  };

  return (
    <div className="sticky top-0 w-[90%]">
      <button
        onClick={handleOpen}
        className="bg-green-600 text-[9px] tablet:shadow-lg laptop:text-[16px] text-white px-2 py-2  tablet:px-4 tablet:py-2 tablet:text-[14px] rounded-lg font-bold font-poppins"
      >
        + Add New Address
      </button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Input address</DialogHeader>
          <DialogBody>
            <OpenAccordion
              province={province}
              cities={cities}
              setIdCities={setIdCities}
              setIdProvince={setIdProvince}
              placeholder="Contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values}
              handlePhoneChange={handlePhoneChange}
              idProvince={idProvince}
              geo={geo}
              setGeo={setGeo}
              error={formik.touched && formik.errors}
              getCities={getCities}
              handleDrag={handleDrag}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};
