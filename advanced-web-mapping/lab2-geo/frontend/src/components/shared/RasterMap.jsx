import React from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  // Replace with the URL to your actual tile image
  const tileUrl = 'http://localhost:8000/static/tiles/7/60/97.png';
  const image2 = 'http://localhost:8000/static/tiles/8/123/194.png';
  // const tileUrl = 'http://localhost:8000/static/tiles/{z}/{x}/{y}.png';
  const thunderforestUrl = 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=00c5ecb96104439fba6f54f1e03d15e1';
  const attributionText = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
 
  
  // Replace with the actual geographical bounds the tile covers
  // The bounds are [[northLat, westLng], [southLat, eastLng]]
  // Define bounds for the ImageOverlay using the corner coordinates from gdalinfo
  const westBounds = [
    [52.4058333, -11.325], // Upper left corner (latitude, longitude)
    [51.3566667, -8.3343333] // Lower right corner (latitude, longitude)
  ];

  const southEastBounds = [
    [52.698889719842144, -5.1716532071330625], // Upper left corner (latitude, longitude)
    [51.38190280875771, -7.1793105000109005] // Lower right corner (latitude, longitude)
  ];
  return (
    <MapContainer center={[52.031011428649464, -6.826732289153744]} zoom={8} className='raster-map'>
      {/* Base TileLayer */}
      {/* <TileLayer
        className="grayscale"
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}

<TileLayer
      className="grayscale"
     url={thunderforestUrl}
     attribution={attributionText}
     maxZoom={22}
     
   />
      
    
      {/* <ImageOverlay
        url={tileUrl}
        bounds={westBounds}
        opacity={0.9}
      /> */}

    {/* south east */}
    <ImageOverlay
        url={image2}
        bounds={southEastBounds}
        opacity={0.9}
      />
    </MapContainer>
  );
}