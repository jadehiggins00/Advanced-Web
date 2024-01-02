import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet';
import Cookies from 'universal-cookie';
import Logout from '../../static/images/Logout.svg';
import LegendOrange from '../../static/images/legendOrange.svg';
import LegendBlue from '../../static/images/legendBlue.svg';

export default class BirdHides extends Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.state = {
            geojsonData: null,
            locations: [],
            showModal: false,
            currentLocation: null,
            newLocationName: '',
            newLocationDescription: '',
            editingLocationId: null,
           
        };
    }

    customMarkerIcon = L.icon({
        iconUrl: '/static/images/bio.png', // Replace with your image path
        iconSize: [35, 35],
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

    handleAddLocationClick = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                currentLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                showModal: true,
                editingLocationId: null
            });
        });
    };

    handleFormChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitNewLocation = () => {
        const { currentLocation, newLocationName, newLocationDescription, editingLocationId } = this.state;
        const url = editingLocationId ? `/api/update_location/${editingLocationId}/` : '/api/add_location/';
        const method = editingLocationId ? 'PUT' : 'POST';

        const postData = {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            name: newLocationName,
            description: newLocationDescription,
        };

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.cookies.get('csrftoken'),
            },
            credentials: 'include',
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
            this.setState({ showModal: false, editingLocationId: null });
            this.fetchLocations();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    handleEditLocation = (location) => {
   
        this.setState({
            currentLocation: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            newLocationName: location.name,
            newLocationDescription: location.description,
            showModal: true,
            editingLocationId: location.id
        });
    };

    handleDeleteLocation = (locationId) => {
      console.log("Deleting location with ID:", locationId); // Debugging line
      if (locationId === undefined) {
          console.error("Error: locationId is undefined");
          return;
      }
  
      fetch(`/api/delete_location/${locationId}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.cookies.get('csrftoken'),
        },
        credentials: 'include',
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          this.fetchLocations();
      })
      .catch(error => console.error('Error:', error));
  };
  

    fetchLocations = () => {
        fetch('/api/get_all_locations')
        .then(response => response.json())
        .then(data => {
            this.setState({ locations: data.locations });
        })
        .catch(error => console.error('Error:', error));
    };

    componentDidMount() {
        fetch('/api/birdhides_ireland')
        .then(response => response.json())
        .then(osmData => {
            const geojsonData = osmtogeojson(osmData);
            this.setState({ geojsonData });
        })
        .catch(error => console.error('Error:', error));

        this.fetchLocations();
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
                <MapContainer center={[53.4129, -8.2439]} zoom={6}>
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
                        <Marker key={index} position={[location.latitude, location.longitude]} icon={this.customMarkerIcon}>
                            <Popup>
                                <strong>{location.name || 'Unknown Location'}</strong>
                                <br />
                                {location.description}
                                <br />
                                <button className='btn btn-secondary mt-2' onClick={() => this.handleEditLocation(location)}>Edit</button>
                                <button className='btn btn-danger ms-1 mt-2' onClick={() => this.handleDeleteLocation(location.id)}>Delete</button>
                            </Popup>
                        </Marker>
                    ))}
                    <button className='btn btn-map' onClick={this.handleAddLocationClick}>Add Your Location</button>
                    <div className="map-label" style={{ zIndex: 500 }}>
                        <div className="row">
                            <div className="col-md-4 col-12 d-flex justify-content-end">
                                <img src={LegendOrange} alt="orange tab" className="img-fluid legend" />
                            </div>
                            <div className="col-md-8 col-12 d-flex align-items-center justify-content-start">
                                <h6 className="">OSM Locations</h6>
                            </div>
                        </div>
                        <div className="row legend-row">
                            <div className="col-md-4 col-12 d-flex justify-content-end">
                                <img src={LegendBlue} alt="blue tab" className="img-fluid legend" />
                            </div>
                            <div className="col-md-8 col-12 d-flex align-items-center justify-content-start">
                                <h6 className="">User Locations</h6>
                            </div>
                        </div>
                    </div>





                </MapContainer>

                {this.state.showModal && (
               <div className="container-fluid">
               <div className='row'>
                  
                   <div className='col-12 col-md-11 pt-3'>
                     
                       <div className='row form-items'>
                           <div className='col'>
                               <input 
                                   className='form-control'
                                   type="text" 
                                   name="newLocationName" 
                                   placeholder="Name of Location" 
                                   onChange={this.handleFormChange} 
                               />
                           </div>
                       </div>
           
                    
                       <div className='row'>
                           <div className='col'>
                               <textarea 
                                   className='form-control'
                                   name="newLocationDescription" 
                                   placeholder="Bird Description" 
                                   onChange={this.handleFormChange}
                               ></textarea>
                           </div>
                       </div>
           
                    
                       <div className='row'>
                           <div className='col-12 col-sm-5 '>
                               <button className='btn btn-secondary w-100 mt-2 ' onClick={this.submitNewLocation}>Submit</button>
                           </div>
                           <div className='col-12 col-sm-2 mt-2 mt-sm-0'>
                               <button className='btn btn-danger w-100 mt-2' onClick={() => this.setState({showModal: false})}>Close</button>
                           </div>
                       </div>
                   </div>
           
                 
                   <div className='col-1 d-none d-md-block'></div>
               </div>
           </div>
           
        )}

            </div>
        );
    }
}
