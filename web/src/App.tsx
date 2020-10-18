import React from 'react';
import Routes from './routes';

import 'leaflet/dist/leaflet.css';
import './styles/global.css';

import Context from './context';

export default function App() {
  return (
    <div className="App">
      <Context>
        <Routes />
      </Context>
    </div>
  );
}

