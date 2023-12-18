import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayerGroup, LayersControl } from 'react-leaflet';

function MyMap() {
  const [highSuitToads, setHighSuitToads] = useState([]);
  const [lowSuitToads, setLowSuitToads] = useState([]);

  useEffect(() => {
    // Fetch high suitability toads
    const high_url = `http://localhost:8000/wildlife/toad_high/`;
    fetch(high_url)
      .then(response => response.json())
      .then(data => setHighSuitToads(data));

    // Fetch low suitability toads
    const low_url = `http://localhost:8000/wildlife/toad_low/`;
    fetch(low_url)
      .then(response => response.json())
      .then(data => setLowSuitToads(data));
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="High Suitability Toads">
          <LayerGroup>
            {highSuitToads.map(toad => (
              <CircleMarker
                key={toad.id}
                center={[toad.latitude, toad.longitude]}
                radius={8}
                color="blue"
                fillColor="blue"
                fillOpacity={0.5}
              >
                <Popup>
                  A high suitability toad.<br />Suitability: {toad.suitabilit}.
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Low Suitability Toads">
          <LayerGroup>
            {lowSuitToads.map(toad => (
              <CircleMarker
                key={toad.id}
                center={[toad.latitude, toad.longitude]}
                radius={8}
                color="red"
                fillColor="red"
                fillOpacity={0.5}
              >
                <Popup>
                  A low suitability toad.<br />Suitability: {toad.suitabilit}.
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default MyMap;
