import React from 'react';
import '../../static/css/App.css';
import Logo from '../../static/images/Logo.svg';


const Header = () => {
    return (
        <div className="container-fluid nav-header">
              
            <img src={Logo} alt="Logo" className="site-logo ms-5 mt-3 "
              />
             {/* <button 
                className="btn btn-primary d-flex align-items-center justify-content-center" 
                title="" 
                data-bs-toggle="tooltip" 
                data-bs-placement="right" 
                data-bs-original-title="Logout" 
                id="logout-tab"
                onClick={logout} // Attach the logout function here
              >

                <span className="text-container nav-text" id="nav-text-logout">Logout</span>
              </button> */}
         
        {/* <h1 className="white-main-text">Irish Bird Watch Spots</h1> */}
        </div>
        

    );
};
export default Header;