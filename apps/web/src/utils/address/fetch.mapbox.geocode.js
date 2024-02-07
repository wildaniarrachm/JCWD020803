export const fetchMapboxGeocode = async (data) => {
  console.log(data);
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?access_token=${
        import.meta.env.VITE_MAPBOX_KEY
      }`,
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
