import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { EventDetails } from './pages/EventDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
