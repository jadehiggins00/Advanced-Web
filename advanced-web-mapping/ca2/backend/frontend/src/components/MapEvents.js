// MapEvents.js
import React from 'react';
import { useMapEvents } from 'react-leaflet';

const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

export default MapEvents;
