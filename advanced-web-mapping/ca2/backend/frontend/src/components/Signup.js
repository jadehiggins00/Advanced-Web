import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password1 !== password2) {
            // Handle password mismatch (e.g., show error message)
            return;
        }

        axios.post('/api/register/', {
            username,
            email,
            password: password1  // Assuming your backend expects a single password
        }).then(response => {
            // Handle success (e.g., redirect to login page)
        }).catch(error => {
            // Handle error (e.g., show error message)
        });
    };

    return (
        <div className="container-fluid ">
            <Header/>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Sign Up</h2>
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
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password1}
                                onChange={e => setPassword1(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-2">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
