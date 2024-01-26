import { useEffect, useRef } from 'react';
import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl';
export const MapsBranch = ({ geo, handleDrag, direct, setDirect }) => {
  const mapRef = useRef();
  console.log(geo);

  const getDirection = () => {
    if (direct === true) {
      mapRef.current.flyTo({
        center: [geo?.lng, geo?.lat],
      });
      setDirect(false);
    }
  };
  useEffect(() => {
    getDirection();
  }, [direct]);
  return (
    <div className="h-[400px] w-full">
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
  );
};
