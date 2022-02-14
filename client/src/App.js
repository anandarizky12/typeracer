import './App.css';
import React  from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import history from './History';
import GameMenu from './components/GameMenu';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
      
         <Routes>
          
             <Route exact path='/' element={<GameMenu/>} />
        
         </Routes>
      </Router>
      </div>
 
  );
}

export default App;
