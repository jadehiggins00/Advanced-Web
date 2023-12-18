// App.js
import React, { Component } from 'react';
import './App.css';
import Home from './views/Home';
import Fossils from './views/Fossils';
import Bio from './views/Bio';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
          
           <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/curlew' element={< Fossils />}></Route>
                 <Route exact path='/toad' element={< Bio />}></Route>
          </Routes>
          </div>
       </Router>
   );
  }
}
  
export default App;
