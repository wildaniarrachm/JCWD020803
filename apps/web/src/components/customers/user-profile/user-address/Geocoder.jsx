import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import PropTypes from 'prop-types';

const Geocoder = ({ setGeo }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_KEY,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    setGeo({
      lat: coords[0],
      lng: coords[1],
    });
  });
  return null;
};

export default Geocoder;

Geocoder.propTypes = {
  setGeo: PropTypes.func.isRequired,
};
