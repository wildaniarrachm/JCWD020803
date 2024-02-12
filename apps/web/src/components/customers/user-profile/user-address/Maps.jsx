import { useEffect, useRef, useState } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
import { fetchMapboxLngLat } from '../../../../utils/address/fetch.mapbox.geocode';

export const OpenMaps = ({ setGeo, geo, handleDrag }) => {
  const mapRef = useRef();
  const [details, setDetails] = useState();
  const getCurrentLocation = async () => {
    if (!geo?.lat && !geo?.lng) {
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
      }
    } else {
      mapRef.current.flyTo({
        center: [geo?.lng, geo?.lat],
      });
    }
  };
  const handleDetailAddress = async () => {
    const response = await fetchMapboxLngLat(geo);
    setDetails(response?.features[0]?.place_name);
  };
  useEffect(() => {
    getCurrentLocation();
    handleDetailAddress();
  }, [geo]);
  return (
    <div className=" mx-auto w-[100%] h-[400px] tablet:h-[300px] laptop:h-[300px] py-5 ">
      <div className="h-[100%] laptop:h-[100%] w-full">
        <ReactMapGl
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '5px',
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
      <p>{details}</p>
    </div>
  );
};
