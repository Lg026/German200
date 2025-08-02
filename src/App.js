import './App.css';
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Test from './components/Test';
import { ThemeProvider } from './context/themeContext';
import Flashcards from './components/Flashcards';

function App() {

  return (
    <ThemeProvider>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path='/flashcards' element={<Flashcards />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
