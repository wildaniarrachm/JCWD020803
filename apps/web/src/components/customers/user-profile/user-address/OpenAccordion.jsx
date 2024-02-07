import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Input,
  Spinner,
} from '@material-tailwind/react';
import mapIcon from '../../../../assets/map.png';
import { useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { FormNewAddress } from './form';
import { OpenMaps } from './maps';
import { fetchMapboxGeocode } from '../../../../utils/address/fetch.mapbox.geocode';

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
  const [direct, setDirect] = useState(true);
  const [detailAddress, setDetailAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [benchmark, setBenchmark] = useState('');
  const handleBenchmark = (e) => setBenchmark(e);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleDetailAddress = async () => {
    setLoading(true);
    try {
      const response = await fetchMapboxGeocode(benchmark);
      setDetailAddress(response?.features);
      setLoading(false);
      setDirect(false);
    } catch (error) {
      return error
    }
  };
  const handleClick = (event) => {
    setGeo({ lng: event?.center[0], lat: event?.center[1] });
    setBenchmark(event?.place_name);
    setDirect(true);
  };

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
          <div className="relative justify-between flex gap-12 mb-2">
            <Input
              label="Search benchmark"
              variant='standard'
              value={benchmark}
              onChange={(e) => handleBenchmark(e?.target?.value)}
            />
            {loading === true ? (
              <Button disabled>
                <Spinner className="mx-auto" />
              </Button>
            ) : (
              <button onClick={handleDetailAddress}>Search</button>
            )}
            <div
              className={`${
                direct === false > 0 ? 'absolute' : 'hidden'
              } left-0 top-10 overflow-y-scroll h-[200px] w-[80%] rounded-lg z-10 bg-white px-2`}
            >
              {detailAddress?.map((detail) => (
                <div
                  key={detail?.id}
                  onClick={() => handleClick(detail)}
                  className="py-2 cursor-pointer hover:bg-gray-200 "
                >
                  <small className="font-poppins">{detail?.place_name}</small>
                </div>
              ))}
            </div>
          </div>
          <OpenMaps
            setGeo={setGeo}
            geo={geo}
            loading={loading}
            direct={direct}
            setDirect={setDirect}
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
            error={error}
          />
        </AccordionBody>
      </Accordion>
    </>
  );
};
