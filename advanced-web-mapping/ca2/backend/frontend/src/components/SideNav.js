import React from 'react';
import '../../static/css/App.css';

const SideNav = () => {
   
    return (
        <div className="container-fluid ms-1 ">
            <div className="row">
             
                    <div className="d-flex flex-sm-column flex-row flex-nowrap  align-items-center sticky-top">
                        <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-1 align-items-center "
                            >
                            <li className='pt-5'> 
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                                    {/* <Link to="/curlew" >
                                        <button className="btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Fossil" id="fossil-tab">
                                            <img src={Fossil} alt="Fossil tab" className="nav-icon mt-1" />
                                         
                                            <span className=" text-container nav-text " id="nav-text-fossil"  >Species 1</span>
                                        </button>
                                    </Link>
                                    hiiiiiii */}
                                    hiiii
                                  
                                    </div>
                                </div>
                            </li>
                            <li className='pt-5'>
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                                        {/* <Link to="/toad" >
                                            <button  className=" btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Bio" id="leaf-tab">
                                                <img src={Leaf} alt="Bio tab" className="leaf-icon  " />
                                                <span className=" text-container nav-text" id="nav-text-bio" >Species 2</span>
                                            </button>
                                        </Link> */}
                                    </div>
                                  
                                </div>
                            </li>
                            <li className='pt-5'>
                                <div className="nav-item d-flex justify-content-start">
                                    <div className="button-container">
                                        {/* <button  className=" btn tab-button d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Species" id="species-tab">
                                            <img src={Species} alt="Species tab" className="leaf-icon " />
                                            <span className=" text-container nav-text" id="nav-text-species3" >Species 3</span>
                                        </button> */}
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