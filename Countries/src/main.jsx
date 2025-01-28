import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CountriesList from './Components/pays.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Liste des Pays</h1>
      <CountriesList />
    </div>
  </StrictMode>
);
