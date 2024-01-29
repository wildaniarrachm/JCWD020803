import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import mapIcon from '../../../../assets/map.png';
import { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { FormNewAddress } from './Form';
import { fetchOpenCage } from '../../../../utils/address/fetch.opencage';
import { OpenMaps } from './Maps';

export const OpenAccordion = ({
  province,
  cities,
  setIdCities,
  setIdProvince,
  onChange,
  onBlur,
  value,
  handlePhoneChange,
  idProvince,
  geo,
  setGeo,
  error,
  handleDrag,
}) => {
  const [open, setOpen] = useState(2);
  const [detailAddress, setDetailAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleDetailAddress = async () => {
    setLoading(true);
    try {
      if (geo?.lat && geo?.lng) {
        const response = await fetchOpenCage(geo);
        if (response?.data?.results) {
          setDetailAddress(response?.data?.results);
          setData(response?.data?.results);
        }
        if (response?.message === 'Network Error') {
          alert(response?.message);
          return setLoading(true);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    handleDetailAddress();
  }, [geo]);

  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="font-poppins font-normal text-md"
        >
          <div className="flex justify-center items-center gap-3 w-[80%] mx-auto h-[40px] mt-2 border border-gray-300  rounded-md">
            <img src={mapIcon} alt="Maps" className="h-[20px]" />
            <h2>Choose pin location</h2>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <OpenMaps
            setGeo={setGeo}
            geo={geo}
            loading={loading}
            detailAddress={detailAddress}
            handleDrag={handleDrag}
          />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="overflow-auto">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="border-none font-poppins font-normal text-md overflow-auto"
        >
          <div className="flex gap-3 rounded-md">
            <h2>
              Detail Location{' '}
              <span className="text-main-red/80 font-bold text-xs">
                {`*(Make sure you have filled in the PIN Point correctly)`}
              </span>
            </h2>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <FormNewAddress
            province={province}
            cities={cities}
            setIdCities={setIdCities}
            setIdProvince={setIdProvince}
            placeholder="Contact"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            handlePhoneChange={handlePhoneChange}
            idProvince={idProvince}
            data={data}
            error={error}
          />
        </AccordionBody>
      </Accordion>
    </>
  );
};
