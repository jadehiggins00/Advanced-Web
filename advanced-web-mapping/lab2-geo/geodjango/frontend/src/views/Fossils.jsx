import React, { useState, useEffect } from 'react';
import SideNav from '../components/shared/SideNav';
import Header from '../components/shared/Header';
import Map from '../components/shared/Map';

  
function Fossils (){

    // const [animals, setAnimals] = useState([]); // State to store the data

    // useEffect(() => {
    //   // Fetch the data when the component mounts
    //   fetch('http://localhost:8000/wildlife/animal/')
    //     .then(response => response.json())
    //     .then(data => setAnimals(data)) // Update the state with the fetched data
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []); // The empty array ensures this effect runs once on mount
    // console.log(animals);
    return (
        <div className="container-fluid ">
          <Header/>
          <div className="row">
              <div className="sidenav col-sm-auto  sticky-top">
                  <SideNav/>
    
              </div>
              <div className="col-sm p-3 min-vh-100">
              {/* <ul>
                {animals.map(animal => (
                  
                  <li key={animal.id}>{animal.name} </li>
                ))}
              
              </ul> */}
                Curlew 
             
              </div>
 
          </div>
        </div>
      );
}
  
export default Fossils;