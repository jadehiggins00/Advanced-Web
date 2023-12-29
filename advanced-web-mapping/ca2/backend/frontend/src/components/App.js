import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Species from './Species';
import '../../static/css/App.css';

 class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/species' element={<Species />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;