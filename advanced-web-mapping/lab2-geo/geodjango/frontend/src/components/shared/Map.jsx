import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import Binoc from '../../assets/images/bino2.png';
import L from 'leaflet';
import osmtogeojson from 'osmtogeojson';

export default function Map() {
  const [toadObservations, setToadObservations] = useState(null);
  const mapRef = useRef(null); // Ref for accessing the map instance

  useEffect(() => {
    fetch('http://localhost:8000/assignment1/bird-watch/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(osmData => {
        const geojsonData = osmtogeojson(osmData);
        setToadObservations(geojsonData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const customIcon = L.icon({
    iconUrl: Binoc,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  const polygonStyle = {
    color: "red",
    fillColor: "cyan",
    fillOpacity: 0.5,
  };

  const onEachFeature = (feature, layer) => {
    if (feature.geometry.type === "Polygon") {
      layer.setStyle(polygonStyle);
      // Example of zooming to a polygon
      layer.on('click', () => {
        console.log('click me');
        const map = mapRef.current;
        if (map) {
          map.fitBounds(layer.getBounds());
        }
      });
    }
  };

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: customIcon });
  };

  return (
    <MapContainer
      center={[53.49665510112185, -7.797701484861317]}
      zoom={7}
      style={{ height: '500px', width: '100%' }}
      whenCreated={mapInstance => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {toadObservations && (
        <GeoJSON
          data={toadObservations}
          pointToLayer={pointToLayer}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
}
