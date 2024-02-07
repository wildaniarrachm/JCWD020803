import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
import { getAddressById } from '../../../../utils/address/get.byid';
import { fetchOpenCage } from '../../../../utils/address/fetch.opencage';
import { Typography } from '@material-tailwind/react';
import { FormEditAddress } from './formEditAddress';
export const EditAddress = () => {
  const mapRef = useRef();
  const { id } = useParams();
  const [geo, setGeo] = useState({ lng: '', lat: '' });
  const [loading, setLoading] = useState(false);
  const [detailAddress, setDetailAddress] = useState();
  const [addressData, setAddressData] = useState({
    id: '',
    street: '',
    label_address: '',
    received_name: '',
    phone_number: '',
    latitude: geo?.lat,
    longitude: geo?.lng,
  });
  const getAddress = async () => {
    const response = await getAddressById(id);
    if (response?.data?.result) {
      setGeo({
        lng: response?.data?.result?.longitude,
        lat: response?.data?.result?.latitude,
      });
      setAddressData({
        street: response?.data?.result?.street,
        label_address: response?.data?.result?.label_address,
        received_name: response?.data?.result?.received_name,
        phone_number: response?.data?.result?.phone_number,
        latitude: response?.data?.result?.latitude,
        longitude: response?.data?.result?.longitude,
        id: response?.data?.result?.id,
      });
      await mapRef.current.flyTo({
        center: [
          response?.data?.result.longitude,
          response?.data?.result.latitude,
        ],
      });
    }
  };
  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailAddress = async () => {
    setLoading(true);
    try {
      if (geo?.lat && geo?.lng) {
        const response = await fetchOpenCage(geo);
        if (response?.data?.results) {
          setDetailAddress(response?.data?.results);
        }
        if (response?.message === 'Network Error') {
          alert(response?.message);
          return setLoading(true);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };
  const handleDrag = (e) => {
    setGeo({
      lat: e?.lat,
      lng: e?.lng,
    });
    mapRef.current.flyTo({
      center: [e?.lng, e?.lat],
    });
    setAddressData({ ...addressData, latitude: e?.lat, longitude: e?.lng });
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    handleDetailAddress();
  }, [geo]);
  return (
    <>
      <div className="bg-gray-200 font-poppins">
        <div className="h-full flex flex-col items-center py-5 px-1 laptop:px-2 bg-white mx-2 rounded-lg">
          <div className="border border-gray-300 h-[350px] w-full laptop:h-[400px] flex flex-col gap-5 rounded-md laptop:w-[85%]">
            <div className="h-[70%] px-2 laptop:px-5">
              <ReactMapGl
                ref={mapRef}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '5px',
                  marginTop: '10px',
                }}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
                initialViewState={{
                  longitude: geo?.lng,
                  latitude: geo?.lng,
                  zoom: 15,
                }}
                cooperativeGestures={true}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                <Marker
                  latitude={geo?.lat}
                  longitude={geo?.lng}
                  draggable
                  onDragEnd={(e) => handleDrag(e?.lngLat)}
                />
                <NavigationControl position="bottom-right" />
              </ReactMapGl>
            </div>
            <div className="h-[10%] px-2 laptop:px-5">
              <small className="text-gray-500">
                Full Address {`(Base on location point)`}
              </small>
              {loading ? (
                <div className="h-full w-full mt-4 font-poppins animate-pulse">
                  <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 rounded-full bg-gray-300 w-full"
                  >
                    &nbsp;
                  </Typography>
                </div>
              ) : (
                <div className="h-full mt-2 font-poppins">
                  {detailAddress?.map((detail) => (
                    <h2 key={detail} className="text-[12px] laptop:text-sm">
                      {detail?.formatted}
                    </h2>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white h-[200px] m-2 rounded-lg">
          <FormEditAddress
            addressData={addressData}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
