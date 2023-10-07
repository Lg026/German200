import './App.css';
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Test from './components/Test';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
