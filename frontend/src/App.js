import React from 'react';
import './global.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Play from './pages/Play';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/play" />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;