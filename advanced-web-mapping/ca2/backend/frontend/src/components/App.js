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

export default class App extends Component {
 


  render() {


    return (
      <div className="container-fluid ">
      <Header/>
      <div className="row">
          <div className="sidenav col-sm-auto  sticky-top">
              <SideNav/>

          </div>

          
          <div className="col-sm p-3 min-vh-100">
      

            <div className="row">
                <div className="col-7" >
          
                <BirdHides/>
                
                </div>
                <div className="col-5  " >
           

              
                  <h1 className="blue-main-text">
                  Welcome to Irish Bird Watch</h1>
                  {/* <img src={Curlew} alt="image of curlew" className=" "
                /> */}

              <h4>Feathered Treasures of the Emerald Isle: Discover Ireland's Rich Tapestry of Birdlife</h4>
                <div className="d-flex  justify-content-end ">
             
                </div>
            
                </div>
            </div>
            <div className="row pt-5">
                {/* <div className="col-6" >

                </div>
                <div className="col-6 " >
         
                </div> */}


              
            <img src={Curlew} alt="image of curlew" className="  col-7 "
                />



                
            </div>
    
          
          </div>
      
      </div>
    </div>
      
    );
  }
}

const appDiv = document.getElementById('app');
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(<App />);
}
