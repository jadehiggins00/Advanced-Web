import React from 'react';
import Logo from '../../assets/images/Logo.svg';


const HeaderComponent = () => {
    return (
        <div class="container-fluid nav-header ">
            <img src={Logo} alt="Logo" className="site-logo mt-3
            " />
        </div>

    );
};
export default HeaderComponent;