import { useEffect, useState } from 'react';
import { getBranchById } from '../../../../../utils/branch/get.by.id';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { MapsBranch } from '../new-branch/maps';
import { SearchBenchmark } from '../new-branch/searchBenchmark';
import { fetchMapboxGeocode } from '../../../../../utils/address/fetch.mapbox.geocode';
import { getAllProvince } from '../../../../../utils/address/get.province';
import { getCityByProvince } from '../../../../../utils/address/get.city';
import { getAllAdmin } from '../../../../../utils/admin/get.all.admins';
import { FormEditBranch } from './Form';
import { editBranch } from '../../../../../utils/branch/edit.branch';

export const EditBranch = () => {
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const [admins, setAdmins] = useState({ data: [], idAdmins: '' });
  const [benchmark, setBenchmark] = useState('');
  const [place, setPlace] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [direct, setDirect] = useState(false);
  const { id } = useParams();
  const [provinces, setProvinces] = useState({ data: [], idProvince: '' });
  const [cities, setCities] = useState({ data: [], idCities: '' });
  const [geo, setGeo] = useState({ lng: '', lat: '' });

  const getDistrick = async () => {
    if (benchmark !== undefined) {
      const response = await fetchMapboxGeocode(benchmark);
      console.log(response);
      if (response?.features?.length > 0) {
        setPlace(response?.features);
        handleOpen();
      } else {
        alert('Oops place not found');
      }
    }
  };
  const getProvinces = async () => {
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
  const handlePlace = (e, place_name) => {
    setGeo({ lng: e[0], lat: e[1] });
    setBenchmark(place_name);
    handleOpen();
    setDirect(true);
  };
  const handleChangebenchmark = (e) => {
    setBenchmark(e);
  };
  const getBranch = async () => {
    const response = await getBranchById(id, tokenAdmin);
    formik.setFieldValue('branch_name', response?.data?.branch_name);
    formik.setFieldValue('address', response?.data?.address);
    formik.setFieldValue('store_contact', response?.data?.store_contact);
    formik.setFieldValue('id', id);
    setGeo({ lng: response?.data?.longitude, lat: response?.data?.latitude });
    setDirect(true);
  };
  const onChangeProvince = (e) => {
    setProvinces({ data: provinces?.data, idProvince: e });
    formik.setFieldValue('province_id', e);
  };
  const onChangeGeo = () => {
    formik.setFieldValue('longitude', geo?.lng);
    formik.setFieldValue('latitude', geo?.lat);
  };
  const getAllAdmins = async () => {
    if (tokenAdmin !== null) {
      const response = await getAllAdmin(tokenAdmin);
      if (response?.status === 200) {
        setAdmins({ data: response?.data?.adminData });
      }
    }
  };
  const handleDrag = (e) => {
    setGeo({ lng: e?.lng, lat: e?.lat });
    setDirect(true);
  };
  const handleEdit = async (data) => {
    const response = await editBranch(data, tokenAdmin);
    console.log(response);
  };
  const formik = useFormik({
    initialValues: {
      id: '',
      branch_name: '',
      address: '',
      store_contact: '',
      latitude: '',
      longitude: '',
      province_id: '',
      city_id: '',
      AdminId: '',
    },
    onSubmit: (values, action) => {
      handleEdit(values);
    },
  });

  useEffect(() => {
    getBranch();
    getProvinces();
    getAllAdmins();
  }, []);
  useEffect(() => {
    onChangeGeo();
  }, [geo?.lat && geo?.lng]);
  useEffect(() => {
    getCities();
  }, [provinces?.idProvince]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-full flex flex-col gap-6">
        <SearchBenchmark
          benchmark={benchmark}
          place={place}
          open={open}
          handleChangebenchmark={handleChangebenchmark}
          getDistrick={getDistrick}
          handlePlace={handlePlace}
        />
        <div className=" mx-auto w-[80%]">
          <MapsBranch
            setGeo={setGeo}
            geo={geo}
            direct={direct}
            setDirect={setDirect}
            handleDrag={handleDrag}
          />
        </div>
        <FormEditBranch
          formik={formik}
          onChangeProvince={onChangeProvince}
          provinces={provinces}
          cities={cities}
          admins={admins}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
};
