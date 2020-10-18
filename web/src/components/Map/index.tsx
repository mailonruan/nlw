import React, { useState, useContext, useEffect } from 'react';
import { Map as LeafletMap, MapProps as LeafletMapProps, TileLayer } from 'react-leaflet';

import { Context } from '../../context';

interface MapProps extends LeafletMapProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapProps) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { state } = useContext(Context);

  useEffect(() => {
    if(state.location?.lat && state.location?.long) {
      setLatitude(state.location.lat);
      setLongitude(state.location.long);
    }
  }, [state.location])

  return (
    <LeafletMap 
      center={[latitude, longitude]} 
      zoom={15} 
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </LeafletMap>
  );
}

