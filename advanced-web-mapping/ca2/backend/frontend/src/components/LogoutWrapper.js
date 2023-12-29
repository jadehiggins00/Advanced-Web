import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout'; // Adjust the import path if necessary
const LogoutWrapper = ({ onLogout }) => {
    const navigate = useNavigate();
  
    return <Logout onLogout={onLogout} navigate={navigate} />;
  };

export default LogoutWrapper;
