import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from "react-router-dom";
// import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals';

import Bar from './components/Bar'
import Home from "./components/Home";

// ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(
    <Router>
        <div className="App">
          <Bar/>
          <Home/>
        </div>
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
