import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet'; // Import if custom icons or other Leaflet functionalities are needed
import BirdHides from './BirdHides';
import Header from './Header';
import SideNav from './SideNav';
import '../../static/css/App.css';
import Curlew from '../../static/images/curlew.jpg';

// export default class Home extends Component {
//   render() {

const Home = () => {
    return (
      <div className="container-fluid ">
        <Header/>
        <div className="row">
          <div className="sidenav col-sm-auto sticky-top">
            <SideNav/>
          </div>
          <div className="col-sm p-3 min-vh-100">
            <div className="row">
              <div className="col-md-7 col-12" > {/* Adjust for medium devices and smaller */}
                <BirdHides/>
              </div>
              <div className="col-md-5 col-12" > {/* Adjust for medium devices and smaller */}
                <h1 className="blue-main-text">
                  Welcome to Irish Bird Watch
                </h1>
                <h5 className='pt-3'>Feathered Treasures of the Emerald Isle:
                   Discover Ireland's Rich Tapestry of Birdlife</h5>
                <h3 className='h3-main-text'> There are over 400 known Species!</h3>
              </div>
            </div>
            <div className="row pt-5">
              {/* Other content */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Home;


