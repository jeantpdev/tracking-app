import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProcessPage from './pages/ProcessPage';
import RadicadoSearch from './components/RadicadoSearch';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<RadicadoSearch />} />
          <Route path="/seguimiento/:idRadicado" element={<ProcessPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;