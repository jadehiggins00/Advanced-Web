
import React from 'react';
import SideNav from '../components/shared/SideNav';
 import Header from '../components/shared/Header';
import Map from '../components/shared/Map';
  
function Home (){
    return (
        <div className="container-fluid ">
          <Header/>
          <div className="row">
              <div className="sidenav col-sm-auto  sticky-top">
                  <SideNav/>
 
              </div>
              <div className="col-sm p-3 min-vh-100">
                  <Map/>
              </div>
          </div>
        </div>
      );
}
  
export default Home;