
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polygon } from 'react-leaflet';
//import ColourMapBar from './ColourMapBar';
import L from 'leaflet';
import Legend from '../../assets/images/legend-key.svg';
import LegendOrange from '../../assets/images/legend-key-orange.svg';
import LegendPurple from '../../assets/images/legend-key-purple.svg';
import LegendPink from '../../assets/images/legend-key-pink.svg';

export default function Map() { 
  const [toads, setToads] = useState([]);
  const canvasRenderer = L.canvas(); // Create a canvas renderer instance
  const thunderforestUrl = 'https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png??apikey=00c5ecb96104439fba6f54f1e03d15e1';
  const attributionText = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const [selectedSuitability, setSelectedSuitability] = useState('high');
  const [sliderValue, setSliderValue] = useState(3); // New state for slider's numeric value

  const[toadObservations, setToadObservations] = useState(null);
  // var Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
  //   attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   apikey: '<your apikey>',
  //   maxZoom: 22
  // });
  
  const plasmaGradient = {
    background: 'linear-gradient(to right, #0d0887, #46039f, #7201a8, #9c179e, #bd3786, #d8576b, #ed7953, #fb9f3a, #fdca26, #f0f921)'
  };
  const polygonPositions = [
    [52.370239341528475, -6.260450866004119],
    [52.363757607180275, -6.480923050398369],
    [52.324597690952544, -6.461325522896658],
    [52.344556122380105, -6.235545674804029],
  
  ];


  useEffect(() => {
    // Fetch the GeoJSON data from the Django server
    fetch('http://localhost:8000/wildlife/toad_observations/')
      .then((response) => response.json())
      .then((data) => {
        // Set the GeoJSON data to state
        setToadObservations(data);
      })
      .catch((error) => console.error('Error fetching GeoJSON data:', error));
  }, []); // The empty array causes this effect to only run on mount

    const pointToLayer = (feature, latlng) => {
      // Create a circle marker for each point
      return L.circleMarker(latlng, {
        radius: 7,
        fillColor: "#9BC83B",
        color: "#000",
        weight: 1,
        opacity: 3,
        fillOpacity: 0.8
      });
    };

  
  useEffect(() => {
    // Updated to use suitability level string
    const suitability = selectedSuitability || 'high';
    const url = `http://localhost:8000/wildlife/toads_geojson/?suitability=${suitability}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setToads(data);
        if (!selectedSuitability) {
          setSelectedSuitability('high');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedSuitability]);

  // Updated to map slider value to suitability level
  const handleSliderChange = (event) => {
    const value = parseFloat(event.target.value);
    setSliderValue(value); 

    let suitabilityLevel;
    if (value === 1) suitabilityLevel = 'low';
    else if (value === 2) suitabilityLevel = 'medium';
    else if (value === 3) suitabilityLevel = 'high';
    setSelectedSuitability(suitabilityLevel);
  };

  // Updated to accept suitability level strings
  const getColorBySuitability = (suitabilityLevel) => {
    switch (suitabilityLevel) {
      case 'high':
        return '#f98e09'; // Light yellow for highest value
      case 'medium':
        return '#bc3754'; // Yellow-Orange
      case 'low':
      default:
        return '#57106e'; // Purple for lowest value
    }
  };
  


  // ***********HISTORICAL MAP ******************
//   var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
// 	maxZoom: 16
// });

  // Function to style the GeoJSON layer
  const styleFeature = (feature) => {
    const polygonColor = getColorBySuitability(selectedSuitability);
    return {
   
      fillColor: polygonColor,
      weight: 2,
      opacity: 1,
      color: polygonColor,
      fillOpacity: 0.7
    };
  };

  return (
    <>


      <MapContainer center={[53.49665510112185, -7.797701484861317]} zoom={7} >
      {/* <TileLayer
     
        url={thunderforestUrl}
        attribution={attributionText}
        maxZoom={22}
        
      /> */}
      {/* {selectedSuitability === 'low' && (
        <Polygon positions={polygonPositions} color="red" opacity={0.7} fill={false} />
      )} */}

    <div className="map-label" style={{  zIndex: 500 }}>


      <div className="row">
      
        <div className="col-4 d-flex justify-content-end ">
        <img src={Legend} alt="Fossil tab" className="legend " />
        </div>
        <div className="col-8 d-flex justify-content-start ">
       
        <h6 className=" map-text  ">Presence</h6>
          </div>
      </div>

      <div className="row legend-row">
      
          <div className="col-4 d-flex justify-content-end ">
          <img src={LegendOrange} alt="Fossil tab" className="legend " />
          </div>
          <div className="col-8 d-flex justify-content-start ">
        
          <h6 className=" map-text  ">High Suitability</h6>

          </div>
      </div>
      <div className="row legend-row">
      
          <div className="col-4 d-flex justify-content-end ">
          <img src={LegendPink} alt="Fossil tab" className="legend " />
          </div>
          <div className="col-8 d-flex justify-content-start ">
        
          <h6 className=" map-text  ">Mid-Level Suitability</h6>
          </div>
      
      </div>
      <div className="row legend-row">
      
      <div className="col-4 d-flex justify-content-end ">
      <img src={LegendPurple} alt="Fossil tab" className="legend " />
      </div>
      <div className="col-8 d-flex justify-content-start ">
    
      <h6 className=" map-text  ">Low Suitability</h6>
      
  
  </div>
      
        
    </div>
  
              
   
    </div>
      {/* plot points for OG toads */}
      {toadObservations && (
              <GeoJSON
                data={toadObservations}
                pointToLayer={pointToLayer}
              />
            )}

      <TileLayer
        className="grayscale"
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      

      {toads.map((toad, index) => (
        <GeoJSON 
        key={index}      
          data={JSON.parse(toad.geom_geojson)} 
          style={styleFeature} 
          renderer={canvasRenderer} // Use the canvas renderer
          onEachFeature={(feature, layer) => {
            if (feature.properties && feature.properties.suitabilit) {
              layer.bindPopup(`Suitability: ${feature.properties.suitabilit}`);
            }
          }}
        />
      ))}
    </MapContainer>

    <div className="row">
      
     
      <div className="slider-container pt-3 ">
            {/* <label htmlFor="suitabilityRange">Suitability Threshold: {selectedSuitability}</label> */}
            <input type="range" className="form-range" id="suitabilityRange"
                min="1" max="3" step="1"
                value={sliderValue}
                onChange={handleSliderChange} />       


      </div>
      
     
 
        
     



    </div>
    <div className="row">
        <div className="slider-labels pt-1">
          <div className="row">
            <div className="col-2">
              <label className="slider-label  ">Low Prediction</label>
              </div>
              <div className="col-3 ms-3 d-flex justify-content-center">
              {/* <label className="slider-label   ">Medium Prediction</label> */}
              </div>
              <div className="col-2 ms-2 d-flex justify-content-end">
              <label className="slider-label   ">High Prediction</label>
              </div>
              <div className="col-3 ms-5 d-flex justify-content-end " >
                {/* <img src={Legend} alt="Fossil tab" className="legend" /> */}
                {/* <h6 className="h6-text">Known Observations</h6> */}
                   
              </div>
         
          </div>
    
        
        </div>
    </div>

          {/* <ColourMapBar/> */}

    </>


    
  );

}
