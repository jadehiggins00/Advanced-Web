import React, { useState } from 'react';
import '../../static/css/App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function getCsrfToken() {
        debugger;
        const csrfTokenName = 'pogmohoin'; // Your CSRF cookie name
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            let [name, value] = cookie.trim().split('=');
            if (name === csrfTokenName) {
                return decodeURIComponent(value);
            }
        }
        return null; // Or handle the absence of CSRF token as needed
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const csrfToken = getCsrfToken();

        axios.post('/auth/login/', {
            username,
            password,
            csrfmiddlewaretoken: csrfToken,
        }).then(response => {
            // Handle success
        }).catch(error => {
            // Handle error
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Log In</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-2">Log In</button>
                        <Link to="/signup" className="btn btn-primary d-flex align-items-center justify-content-center" title="">
       
                            <span className="text-container nav-text" id="nav-text-bio">Home</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
