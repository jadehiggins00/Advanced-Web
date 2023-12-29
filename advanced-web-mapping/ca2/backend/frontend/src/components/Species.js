import React from 'react';
import '../../static/css/App.css';
import Logo from '../../static/images/Logo.svg';
import BirdHides from './BirdHides';
import Header from './Header';
import SideNav from './SideNav';
import '../../static/css/App.css';
import Curlew from '../../static/images/curlew.jpg';
import Puffins from '../../static/images/puffins.jpg';


const Species = ({ logout }) => {
    return (
        <div className="container-fluid ">
        <Header/>
        <div className="row">
          <div className="sidenav col-sm-auto sticky-top">
            <SideNav logout={logout} />
          </div>
          <div className="col-sm p-3 min-vh-100">
            <div className="row">
              <div className="col-md-5 col-12 " > {/* Adjust for medium devices and smaller */}
                {/* <BirdHides/> */}
                {/* <h6 className="green-main-text">
                Ireland's Birdwatching Delight
                </h6>
             

                <h5 className='pt-3'> The Top 5 Most Popular Bird Species to Spot Across the Emerald Isle</h5> */}
                <h6 className="blue-main-text pt-2 ms-1 ">
                Eurasian Curlew
                </h6>
                <p className='pt-4 ms-1'>
                The Eurasian Curlew, a notable species in Ireland's birdwatching scene, is easily recognized by its long, curved bill and distinctive call. Inhabiting coastal areas and wetlands, this bird is admired for its melodious song and striking appearance. However, it faces threats from habitat loss, making conservation efforts crucial for its survival in Ireland's diverse avian landscape.
                </p>
                <h6 className="green-main-text pt-4">
                Around 210 left in Ireland
                </h6>
                
              </div>
              <div className="col-md-7 col-12 d-flex justify-content-end" > {/* Adjust for medium devices and smaller */}
               
                <img src={Curlew} alt="curlew bird" className=" me-2" />
              </div>
            </div>
            <div className="row pt-5">
            <div className="col-md-7 col-12" > {/* Adjust for medium devices and smaller */}
                {/* <BirdHides/> */}
                {/* <h6 className="green-main-text">
                Ireland's Birdwatching Delight
                </h6>
             

                <h5 className='pt-3'> The Top 5 Most Popular Bird Species to Spot Across the Emerald Isle</h5> */}
             
                
                <img src={Puffins} alt="puffin bird" className=" me-2" />
              </div>
              <div className="col-md-5 col-12 " > {/* Adjust for medium devices and smaller */}
               
                {/* <img src={Curlew} alt="curlew bird" className=" me-2" /> */}

                <h6 className="blue-main-text pt-2 ms-1">
                Puffins
                </h6>
                <p className='pt-4 ms-1'>
                Puffins, with their colorful beaks and charming appearance, are a highlight for birdwatchers in Ireland. These seabirds, often found on rocky cliff islands, are known for their clown-like faces and waddling walk. They breed in colonies on coastal cliffs or offshore islands, making places like the Skelligs and Cliffs of Moher popular for puffin spotting. Despite their small size, puffins are hardy birds, drawing visitors who delight in watching their bustling activities and unique behaviors during the breeding season.
                </p>
                <h6 className="orange-main-text pt-4">
                Around 21,000 pairs left in Ireland
                </h6>
              </div>
           
            </div>
          </div>
        </div>
      </div>

    );
};
export default Species;