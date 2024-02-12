import { createContext, useContext, useState } from 'react';

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [geolocation, setGeolocation] = useState({ lat: '', lng: '' });

  const contextValue = {
    geolocation,
    setGeolocation,
  };

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);

  return context;
};
