import React from 'react';

import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
