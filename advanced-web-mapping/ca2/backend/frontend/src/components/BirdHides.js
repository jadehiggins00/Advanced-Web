import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet';

class Modal extends Component {
  render() {
    const { show, onClose, onSubmit, onNameChange, onDescriptionChange } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
        <h2>Add Bird Location</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Name" onChange={onNameChange} />
          <textarea placeholder="Description" onChange={onDescriptionChange}></textarea>
          <button type="submit">Add Location</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    );
  }
}

export default class BirdHides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geojsonData: null,
      locations: [],
      showModal: false,
      newLocation: { latitude: null, longitude: null, name: '', description: '' }
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    fetch('/api/birdhides_ireland')
      .then(response => response.json())
      .then(osmData => {
        const geojsonData = osmtogeojson(osmData);
        this.setState({ geojsonData });
      })
      .catch(error => console.error('Error:', error));

    fetch('/api/get_all_locations')
      .then(response => response.json())
      .then(data => {
        this.setState({ locations: data.locations });
      })
      .catch(error => console.error('Error:', error));
  }

  handleMapClick = (e) => {
    debugger;
    console.log('hiiiii')
    const { lat, lng } = e.latlng;
    this.setState({
      showModal: true,
      newLocation: { latitude: lat, longitude: lng, name: '', description: '' }
    });
  };

  testButtonClick = () => {
    console.log('Button clicked!');
    this.setState({
      showModal: true,
      newLocation: { latitude: 53.4129, longitude: -8.2439, name: '', description: '' }
    });
  };

  handleNameChange = (e) => {
    this.setState({ newLocation: { ...this.state.newLocation, name: e.target.value } });
  };

  handleDescriptionChange = (e) => {
    this.setState({ newLocation: { ...this.state.newLocation, description: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/add_location/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newLocation)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ showModal: false, locations: [...this.state.locations, data] });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  render() {
    const { geojsonData, locations, showModal } = this.state;

    return (
      <div>

<button onClick={this.testButtonClick}>Test Button</button>
        <MapContainer
          center={[53.4129, -8.2439]}
          zoom={6}
          onClick={this.handleMapClick}
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
        <Modal
          show={showModal}
          onClose={() => this.setState({ showModal: false })}
          onSubmit={this.handleSubmit}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
        />


      </div>
    );
  }
}
