import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      password: "",
      error: "",
      isAuthenticated: false,
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

  isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
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
        <div className="container mt-3">

         
          <h1>React Cookie Auth</h1>
          <br />
          <h2>Login</h2>
          <form onSubmit={this.login}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
              <div>
                {this.state.error &&
                  <small className="text-danger">
                    {this.state.error}
                  </small>
                }
              </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
          </form>
        </div>
      );
    }

    return (
      <Router>
        <div className="App">

        
      
     
          <Routes>

            <Route exact path='/' element={<Home logout={this.logout} />} />
            <Route path='/species' element={<Species />} />
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
