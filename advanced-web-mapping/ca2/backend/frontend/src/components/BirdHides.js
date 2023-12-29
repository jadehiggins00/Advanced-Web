import React, { createRef, Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import LegendOrange from '../../static/images/legendOrange.svg';
import LegendBlue from '../../static/images/legendBlue.svg';


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

        <div className="map-label" style={{  zIndex: 500 }}>


        <div className="row">

          <div className="col-4 d-flex justify-content-end ">
          <img src={LegendOrange} alt="Fossil tab" className="legend " />
          </div>
          <div className="col-8 d-flex justify-content-start ">
        
          <h6 className=" map-text  ">OSM Locations</h6>
            </div>
        </div>

      <div className="row legend-row">

          <div className="col-4 d-flex justify-content-end ">
          <img src={LegendBlue} alt="Fossil tab" className="legend " />
          </div>
          <div className="col-8 d-flex justify-content-start ">
        
          <h6 className=" map-text  ">User Locations</h6>

          </div>
      </div>
  


        

</div>
    
  
    
    
        </MapContainer>

        {this.state.showModal && (
          <div className="container-fluid ">
            <div className='row'>
              <div className='col-11'>
              <div className='row form-items'>
                  <input 
                    className='input-group pt-1'
                    type="text" 
                    name="newLocationName" 
                    placeholder="Name of Location" 
                    onChange={this.handleFormChange} 
                  />
              </div>
              <div className='row'>
                <textarea 
                    className='input-group'
                  name="newLocationDescription" 
                  placeholder="Bird Description" 
                  onChange={this.handleFormChange} 
                />
              </div>
              <div className='row'>
                <div className='col-5'>
                  <button className='btn btn-secondary' onClick={this.submitNewLocation}>Submit</button>
                </div>
                <div className='col-2'>
                  <button onClick={() => this.setState({showModal: false})}>Close</button>
                </div>


              </div>
              </div>

              <div className='col-1'>
                hiiii
              </div>

            </div>
       
         
        

          </div>
        )}


        <div>
          
        </div>
      </div>
    );
  }
}
