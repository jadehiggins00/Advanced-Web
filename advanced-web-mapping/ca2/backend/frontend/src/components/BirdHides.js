import React, { createRef, Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';



export default class BirdHides extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      geojsonData: null,
      locations: [],
      showModal: false,
      currentLocation: null,
      newLocationName: '',
      newLocationDescription: '',
     
    };
  }

  customMarkerIcon = L.icon({
    iconUrl: '/static/images/bio.png', // Replace with your image path
    iconSize: [35, 35], // Size of the icon
    iconAnchor: [12, 41], 
    popupAnchor: [0, -41], 
  });

 
  geoJsonStyle = () => {
    return {
      color: '#E65100',       
      weight: 5,          
      opacity: 1,
      fillOpacity: 0.7
    };
  };


 // Method to handle button click
 handleAddLocationClick = () => {
  
  console.log('clickkk');
  navigator.geolocation.getCurrentPosition((position) => {
    this.setState({
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      showModal: true
    });
  });
};

// Method to handle form changes
handleFormChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};

// Method to submit the new location
submitNewLocation = () => {
  const { currentLocation, newLocationName, newLocationDescription } = this.state;
  const postData = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    name: newLocationName,
    description: newLocationDescription,
  };

  fetch('/api/add_location/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    this.setState({ showModal: false });
  })
  .catch((error) => {
    console.error('Error:', error);

  });
  
};
  


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
          
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
            className="grayscale-tiles"
          />
       
          {geojsonData && (
            <GeoJSON
              data={geojsonData}
              onEachFeature={this.onEachFeature}
              style={this.geoJsonStyle}
         
            />
          )}

     
          {locations.map((location, index) => (
            <Marker key={index} position={[location.latitude, location.longitude]} icon={this.customMarkerIcon} >
              <Popup>
                {location.name ? <strong>{location.name}</strong> : 'Unknown Location'}
                <br />
                {location.description}
              </Popup>
            </Marker>
          ))}

         <button className='btn btn-map' onClick={this.handleAddLocationClick}>
          Add Your Location
        </button>

    
  
    
    
        </MapContainer>

        {this.state.showModal && (
          <div className="modalName">
            {/* You should create a proper modal component */}
            <input 
              type="text" 
              name="newLocationName" 
              placeholder="Name" 
              onChange={this.handleFormChange} 
            />
            <textarea 
              name="newLocationDescription" 
              placeholder="Description" 
              onChange={this.handleFormChange} 
            />
            <button onClick={this.submitNewLocation}>Submit</button>
            <button onClick={() => this.setState({showModal: false})}>Close</button>
          </div>
        )}


        <div>
          
        </div>
      </div>
    );
  }
}
