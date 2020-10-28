import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import ProfileComponent from './ProfileComponent';
import SearchComponent from './SearchComponent';
import LoginComponent from './LoginComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

const NibbleComponent = () => {
  return (
    <body>
      <BrowserRouter>
        <div>
          <Route
            path="/, /home"
            exact={true}
            component={HomeComponent}
          />
          <Route
            path="/profile, /profile/:profileId"
            exact={true}
            component={ProfileComponent}
          />
          <Route
            path="/search"
            exact={true}
            component={SearchComponent}
          />
          <Route
            path="/login"
            exact={true}
            component={LoginComponent}
          />
          {/* <Route
            path="/search/details/:detailId"
            exact={true}
            component={DetailsCompone}
          /> */}
        </div>
      </BrowserRouter>
    </body>
  );
};

export default NibbleComponent;
