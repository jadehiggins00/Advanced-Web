import React from 'react';
import '../../static/css/App.css';
import Logo from '../../static/images/Logo.svg';


const Species = () => {
    return (
        <div className="container-fluid nav-header">
            <img src={Logo} alt="Logo" className="site-logo ms-5 mt-3 "
              />
        {/* <h1 className="white-main-text">Irish Bird Watch Spots</h1> */}
        </div>

    );
};
export default Species;