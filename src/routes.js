import React from 'react';

import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" exact element={<Home />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
