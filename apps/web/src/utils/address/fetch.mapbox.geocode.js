export const fetchMapboxGeocode = async (data) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?access_token=${
        import.meta.env.VITE_MAPBOX_KEY
      }`,
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchMapboxLngLat = async (data) => {
  let longitude = data?.lng;
  let latitude = data?.lat;
  if (data?.longitude && data?.latitude) {
    longitude = data?.longitude;
    latitude = data?.latitude;
  }
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
        import.meta.env.VITE_MAPBOX_KEY
      }`,
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
