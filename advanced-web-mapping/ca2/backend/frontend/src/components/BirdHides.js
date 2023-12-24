import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet'; // Import if custom icons or other Leaflet functionalities are needed

export default class BirdHides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geojsonData: null, // State to store converted GeoJSON data
    };
    this.mapRef = React.createRef(); // Ref for accessing the map instance
  }

  componentDidMount() {
    fetch('/api/birdhides_ireland')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(osmData => {
        const geojsonData = osmtogeojson(osmData);
        this.setState({ geojsonData });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  onEachFeature = (feature, layer) => {
    // Define interactions for each feature (polygon) here
    // Example: setting a popup on click
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  render() {
    const { geojsonData } = this.state;

    return (
      <div >
       
        <MapContainer
          center={[53.4129, -8.2439]}
          zoom={6}
        //   style={{ height: '400px', width: '100%' }}
          whenCreated={mapInstance => { this.mapRef.current = mapInstance; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geojsonData && (
            <GeoJSON
              data={geojsonData}
              onEachFeature={this.onEachFeature}
              // pointToLayer and style functions can be added here if needed
            />
          )}
        </MapContainer>

  

      </div>
      
    );
  }
}

// const birdhidesDiv = document.getElementById('birdhides');
// if (birdhidesDiv) {
//   const root = createRoot(birdhidesDiv);
//   root.render(<BirdHides />);
// }