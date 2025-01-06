import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBarMenu from './AppBarMenu';
import TestPage from './TestPage';
import ScorePage from './ScorePage';

function App() {
  return (
    <Router>
      <AppBarMenu />
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
