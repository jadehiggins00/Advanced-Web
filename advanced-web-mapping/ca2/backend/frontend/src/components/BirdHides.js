import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet';

export default class BirdHides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geojsonData: null, // State to store converted GeoJSON data
      locations: [],     // State to store location data from backend
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // Fetch GeoJSON data
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

   
      // fetch('/api/get_all_locations')
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data); // Corrected position of console.log
      //   this.setState({ locations: data.locations });
      // })
      // .catch(error => console.error('Error fetching locations:', error));
  }

  onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  render() {
    const { geojsonData, locations } = this.state;

    return (
      <div>
        <MapContainer
          center={[53.4129, -8.2439]}
          zoom={6}
          whenCreated={mapInstance => { this.mapRef.current = mapInstance; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {geojsonData && (
            <GeoJSON
              data={geojsonData}
              onEachFeature={this.onEachFeature}
            />
          )}
          {locations.map((location, index) => (
            <Marker key={index} position={[location.latitude, location.longitude]}>
              <Popup>
                {location.name ? <strong>{location.name}</strong> : 'Unknown Location'}
                <br />
                {location.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
}

// Uncomment and use the following lines if you are mounting this component directly in your HTML
// const birdhidesDiv = document.getElementById('birdhides');
// if (birdhidesDiv) {
//   const root = createRoot(birdhidesDiv);
//   root.render(<BirdHides />);
// }
