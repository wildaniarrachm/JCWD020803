import { useEffect, useRef } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';

export const OpenMaps = ({ setGeo, geo, handleDrag, direct, setDirect }) => {
  const mapRef = useRef();
  console.log(direct);
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
      console.log('test');
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, [direct === true]);
  return (
    <div className=" mx-auto w-[100%] h-[300px] tablet:h-[300px] laptop:h-[300px] py-5 ">
      <div className="h-[100%] laptop:h-[100%] w-full">
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
    </div>
  );
};
