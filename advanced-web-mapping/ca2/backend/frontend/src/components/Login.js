import React, { useState } from 'react';
import '../../static/css/App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login/', { username, password });
            if (response.data.status === 'success') {
                // Handle successful login
                // For example, redirect to a dashboard or home page
                console.log('Login successful');
            } else {
                // Handle failed login
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            // Handle network or other axios-related errors
            setError('An error occurred during login');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <div className="error">{error}</div>}
            </form>
             
        <Link to="/signup" >
                            <button className="btn btn-primary d-flex align-items-center justify-content-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Fossil" id="fossil-tab">

                            
                                <span className=" text-container nav-text " id="nav-text-fossil"  >Species</span>
                            </button>
                        </Link>
                     
        </div>
    );
};

export default Login;
