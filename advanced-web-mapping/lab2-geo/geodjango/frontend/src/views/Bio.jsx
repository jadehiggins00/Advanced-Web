import React from 'react';
import SideNav from '../components/shared/SideNav';
import Header from '../components/shared/Header';
import Map from '../components/shared/Map';
import RasterMap from '../components/shared/RasterMap';
import TestMap from '../components/shared/testMap';

  
function Bio (){
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
                    <Map/>
                    
                    </div>
                    <div className="col-5  " >
                    {/* <RasterMap/> */}
                    {/* <RasterMap/> */}
                    {/* <h1 className="blue-main-text">
                    Natterjack Toad Predictions</h1>
                    <p>blah blah blah blah blah</p>
                    <p>blah blah blah blah blah</p>
                    <h3 className="h3-main-text">
                   47 known observations</h3> */}
                    <div className="d-flex  justify-content-end ">
                    {/* <RasterMap/> */}
                    </div>
                
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-6 pt-2" >
                    {/* <Map/> */}
{/* 
                    <h1 className="blue-main-text">Areas of Interest</h1>
                    <p>Here's a comprehensive pixelated representation of the projected species distributions. </p> */}
                    </div>
                    <div className="col-6 pt-4" >
                    {/* <RasterMap/> */}
                  {/* <TestMap/>  */}
                    </div>
                </div>
        
              
              </div>
          
          </div>
        </div>
      );
}
  
export default Bio;