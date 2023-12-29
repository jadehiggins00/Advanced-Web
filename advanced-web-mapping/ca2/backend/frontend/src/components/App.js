import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Species from './Species';
import Login from './Login';
import Signup from './Signup';
import '../../static/css/App.css';

 class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/species' element={<Species />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;