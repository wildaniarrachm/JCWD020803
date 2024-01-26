import { getAllProvince } from '../../../../../utils/address/get.province';
import { useEffect, useState } from 'react';
import { getCityByProvince } from '../../../../../utils/address/get.city';
import { getAllAdmin } from '../../../../../utils/admin/get.all.admins';
import { FormAddBranch } from './formAddBranch';
import { Button } from '@material-tailwind/react';
import { MapsBranch } from './maps';
import { fetchMapboxGeocode } from '../../../../../utils/address/fetch.mapbox.geocode';
import { useFormik } from 'formik';
import { addNewBranch } from '../../../../../utils/branch/add.branch';
import { SearchBenchmark } from './searchBenchmark';

export const AddBranch = () => {
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const [geo, setGeo] = useState({ lng: '', lat: '' });
  const [direct, setDirect] = useState(false);
  const [benchmark, setBenchmark] = useState('');
  const [place, setPlace] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [provinces, setProvinces] = useState({
    data: [],
    idProvince: '',
  });
  const [cities, setCities] = useState({
    data: [],
    idCities: '',
    city_name: '',
  });
  const [admins, setAdmins] = useState({
    data: [],
    idAdmins: '',
  });
  const getProvince = async () => {
    const response = await getAllProvince();
    if (response?.data?.rajaongkir?.status?.code === 200) {
      setProvinces({ data: response?.data?.rajaongkir?.results });
    } else {
      setProvinces({ data: response?.data });
    }
  };
  const getCities = async () => {
    if (provinces?.idProvince !== undefined) {
      const response = await getCityByProvince(provinces?.idProvince);
      if (response?.data?.rajaongkir?.status?.code === 200) {
        setCities({ data: response?.data?.rajaongkir?.results });
      } else {
        if (response?.data) {
          setCities({ data: response?.data?.Cities });
        }
      }
    }
  };
  const getAllAdmins = async () => {
    if (tokenAdmin !== null) {
      const response = await getAllAdmin(tokenAdmin);
      if (response?.status === 200) {
        setAdmins({ data: response?.data?.adminData });
      }
    }
  };

  const getDistrick = async () => {
    if (benchmark !== undefined) {
      const response = await fetchMapboxGeocode(benchmark);
      console.log(response);
      if (response?.features?.length > 0) {
        setPlace(response?.features);
        handleOpen();
      }
    }
  };
  const handlePlace = (e, place_name) => {
    setGeo({ lng: e[0], lat: e[1] });
    setBenchmark(place_name);
    handleOpen();
    setDirect(true);
  };
  const handleChangebenchmark = (e) => {
    setBenchmark(e);
  };
  const handleDrag = (e) => {
    setGeo({ lng: e?.lng, lat: e?.lat });
    setDirect(true);
  };
  useEffect(() => {
    getProvince();
    getAllAdmins();
  }, []);
  useEffect(() => {
    getCities();
  }, [provinces?.idProvince]);

  const addBranchFunc = async (values) => {
    let newData = {
      branch_name: values?.branch_name,
      address: values?.address,
      store_contact: values?.store_contact,
      province_id: provinces?.idProvince,
      city_id: cities?.idCities,
      longitude: geo?.lng,
      latitude: geo?.lat,
      AdminId: admins?.idAdmins,
    };
    const response = await addNewBranch(newData, tokenAdmin);
    setBenchmark('');
  };

  const formik = useFormik({
    initialValues: {
      branch_name: '',
      address: '',
      store_contact: '',
    },
    onSubmit: (values, action) => {
      addBranchFunc(values);
      action.resetForm();
    },
  });
  return (
    <div className="w-[99%] pl-3 pr-10 h-full py-5 shadow-lg rounded-lg bg-main-light grid grid-cols-1 gap-5">
      <form onSubmit={formik?.handleSubmit}>
        <FormAddBranch
          provinces={provinces}
          setProvinces={setProvinces}
          cities={cities}
          setCities={setCities}
          admins={admins}
          onBlur={formik.handleBlur}
          setAdmins={setAdmins}
          handleChange={formik.handleChange}
          value={formik.values}
        />
        <h1 className="font-poppins text-center font-bold mt-10">
          Set Pin Location
        </h1>
        <div className="relative mx-auto mt-2 w-[60%] justify-between flex gap-3">
          <SearchBenchmark
            place={place}
            handleChangebenchmark={handleChangebenchmark}
            benchmark={benchmark}
            getDistrick={getDistrick}
            open={open}
            handlePlace={handlePlace}
          />
        </div>
        <div className="py-[30px]">
          <MapsBranch
            geo={geo}
            direct={direct}
            setDirect={setDirect}
            handleDrag={handleDrag}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
