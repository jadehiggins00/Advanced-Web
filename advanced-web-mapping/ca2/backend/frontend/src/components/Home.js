import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import osmtogeojson from 'osmtogeojson';
import L from 'leaflet'; // Import if custom icons or other Leaflet functionalities are needed
import BirdHides from './BirdHides';
import Header from './Header';
import SideNav from './SideNav';
import BirdWatch from '../../static/images/bird-watch.jpg';
import Bird2 from '../../static/images/bird2.svg';
import '../../static/css/App.css';
import Curlew from '../../static/images/curlew.jpg';

// export default class Home extends Component {
//   render() {

const Home = ({ logout }) => {
    return (
      <div className="container-fluid ">
        <Header/>
        <div className="row">
          <div className="sidenav col-sm-auto sticky-top">
            <SideNav logout={logout} />
          </div>
          <div className="col-sm p-3 min-vh-100">
            <div className="row">
              <div className="col-md-7 col-12" > 
                <BirdHides/>
              </div>
              <div className="col-md-5 col-12 d-flex flex-column justify-content-between">
                  <div>
                    <div className='row'>
                      <h1 className="blue-main-text">
                            Welcome to Irish Bird Watch
                        </h1>
                        <h5 className='pt-3'>Feathered Treasures of the Emerald Isle:
                            Discover Ireland's Rich Tapestry of Birdlife</h5>
                    </div>

                    <div className='row'>
                      <div className='col-9 pt-2'>
                      <img src={BirdWatch} alt="Species tab" className="img-fluid watch-banner " />
                      </div>
                      <div className='col-3'>
                      <img src={Bird2} alt="Species tab" className="img-fluid watch-banner " />
                      </div>
                      
                      </div>

                   
                  </div>

                  <div className='row pt-1'>
                      <h5 className='pt-3 green-main-text'>Add Your Own Bird Hides</h5>
                      <p>Download onto your Mobile Device & Click the Button on the Map to Add your own Bird Spotting Locations!</p>
                  </div>
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


