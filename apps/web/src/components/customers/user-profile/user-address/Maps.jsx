import { Typography } from '@material-tailwind/react';
import Geocoder from './Geocoder';
import { useEffect, useRef } from 'react';
import ReactMapGl, {
  Marker,
  NavigationControl,
} from 'react-map-gl';

export const OpenMaps = ({
  loading,
  setGeo,
  geo,
  detailAddress,
  handleDrag,
}) => {
  const mapRef = useRef();
  const getCurrentLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        mapRef.current.flyTo({
          center: [position?.coords?.longitude, position?.coords?.latitude],
        });
        setGeo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      const response = await fetch(`https://ipapi.co/json/`);
    }
  };
  useEffect(() => {
    if (!geo?.lat && !geo?.lng) {
      getCurrentLocation();
    }
  }, []);
  return (
    <div className=" -top-5 mx-auto w-[100%] h-[200px] tablet:h-[300px] laptop:h-[300px] pb-5 ">
      <div className='h-[80%] laptop:h-[100%] w-full'>
        <ReactMapGl
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
        <div className="h-full mt-3 font-poppins">
          {detailAddress?.map((detail) => (
            <h2 key={detail} className="text-black text-[11px] tablet:text-[14px] laptop:text-sm">
              Result: {detail?.formatted}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};
