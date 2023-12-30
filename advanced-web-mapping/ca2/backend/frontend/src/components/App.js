import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';
import Species from './Species';
import SideNav from './SideNav';
import Logout from './Logout';
import Header from './Header';
import BirdHides from './BirdHides';
import LogoutWrapper from './LogoutWrapper';

import '../../static/css/App.css';

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "", 
      password: "",
      error: "",
      isAuthenticated: false,
      showRegistrationForm: false,
      showLoginForm: true,
    };
  }

  componentDidMount = () => {
    this.getSession();
   
  }

  
  

  getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuthenticated) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("You are logged in as: " + data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  toggleRegistrationForm = () => {
    this.setState(prevState => ({
        showRegistrationForm: !prevState.showRegistrationForm,
        showLoginForm: !prevState.showLoginForm
    }));
}

  isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  register = (event) => {
    event.preventDefault();
    fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
   //TODO: redirect to login
   this.showLoginForm();
    })
    .catch((err) => {
      console.log(err);
      this.setState({ error: "Registration failed." });
    });
  }

  showLoginForm = () => {
    this.setState({ showLoginForm: true, showRegistrationForm: false });
  }
  login = (event) => {
    event.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    })
    .then(this.isResponseOk)
    .then((data) => {
      this.setState({ isAuthenticated: true, username: "", password: "", error: "" });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ error: "Wrong username or password." });
    });
  }

  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      this.setState({ isAuthenticated: false });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className="container-fluid mt-3">
        <Header/>
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
          
                <br />
            {this.state.showLoginForm && (

              <div className='mt-4'>
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        {this.state.error &&
                        <small className="text-danger">
                            {this.state.error}
                        </small>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" onClick={this.login}>Login</button>
                    <button type="submit" onClick={this.toggleRegistrationForm} className="btn btn-primary ms-2 mt-3">Register</button>
                </form>
                {/* <button type="submit" onClick={this.toggleRegistrationForm} className="btn btn-primary mt-3">Register</button> */}
                </div>
      
                )}
                {this.state.showRegistrationForm && (
                  
                    <div className="mt-4">
                         <h2>Register</h2>
                        <form onSubmit={this.register}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Register</button>
                            {this.state.error && <div className="error">{this.state.error}</div>}
                        </form>
                    </div>
                )}
            </div>
        </div>
    </div>
    
      );
    }

    return (
      <Router>
        <div className="App">

        
      
     
          <Routes>

            <Route exact path='/' element={<Home logout={this.logout} />} />
            <Route path='/species' element={<Species logout={this.logout} />} />
            <Route path='/logout' element={<LogoutWrapper onLogout={this.logout} />} />


       
          </Routes>
          {/* <div className="container mt-3"> */}
            {/* <h1>Are you sure you want to sign out?</h1>
            <p>You are logged in!</p>
            <button className="btn btn-primary mr-2" onClick={this.whoami}>WhoAmI</button>
            <button className="btn btn-danger" onClick={this.logout}>Log out</button> */}
          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
