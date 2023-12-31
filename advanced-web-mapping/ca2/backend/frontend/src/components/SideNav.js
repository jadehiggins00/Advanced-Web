import React from 'react';
import '../../static/css/App.css';
import {  Link } from 'react-router-dom';
import claw from '../../static/images/claw-tab.svg';
import Map from '../../static/images/map.svg';
import Logout from '../../static/images/Logout.svg';

const SideNav = ({ logout }) => {

    return (
        <div className="container-fluid ms-1 ">
            <div className="row">
             
                    <div className="d-flex flex-sm-column flex-row flex-nowrap  align-items-center sticky-top">
                        <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-1 align-items-center "
                            >
                            <li className='pt-5'> 
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                           
    
                                        {/* <Link to="/" >
                                            <button  className=" btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Bio" id="leaf-tab">
                                                <img src={Map} alt="Bio tab" className="leaf-icon  " />
                                                <span className=" text-container nav-text" id="nav-text-bio" >Home</span>
                                            </button>
                                        </Link> */}

                                      <Link to="/" >
                                         <button  className=" btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Species" id="species-tab">
                                            <img src={Map} alt="Species tab" className="leaf-icon " />
                                            <span className=" text-container nav-text" id="nav-text-species3" >Home</span>
                                        </button>
                                    </Link>
                                  
                                    </div>
                                </div>
                            </li>
                            <li className='pt-5'>
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                                        {/* <Link to="/" >
                                            <button  className=" btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Bio" id="leaf-tab">
                                                <img src={Map} alt="Bio tab" className="leaf-icon  " />
                                                <span className=" text-container nav-text" id="nav-text-bio" >Home</span>
                                            </button>
                                        </Link> */}

                                    <Link to="/species" >
                                        <button className="btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Fossil" id="fossil-tab">
                                            <img src={claw} alt="Fossil tab" className="nav-icon mt-1" />
                                     
                                            <span className=" text-container nav-text " id="nav-text-fossil"  > Birds</span>
                                        </button>
                                    </Link>

                                {/* <Link to="/species" className="btn tab-button d-flex align-items-center justify-content-center">
                                <img src={claw} alt="Species tab" className="nav-icon mt-1" />
                                <span className="text-container nav-text">Species</span>
                                </Link> */}

                                    </div>
                                  
                                </div>
                            </li>
                            <li className='pt-5'>
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                                    <button 
                                        className="btn tab-button d-flex align-items-center justify-content-center"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="Bio"  
                                        id="leaf-tab"                   
                                        onClick={logout}                 
                                        >
                                        <img src={Logout} alt="Logout tab" className="leaf-icon" />
                                        <span className="text-container nav-text" id="nav-text-bio">Logout</span>
                                        </button>

                                    </div>
                                </div>
                            </li>
                     
                        </ul>
                        <div className="dropdown">
                          
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
    
                            </ul>
                        </div>
                    </div>
               

            </div>
        </div>
    );
};

export default SideNav;