import React from 'react';
// A Route is used to declaratively map routes to your application's screen hiearchy.
// A DefaultRoute will be the matched child route when the parent's path matches exactly.
import {Route, DefaultRoute} from 'react-router';
import Main from 'views/Main';

/**
 * The React Routes for both the server and the client.
 * @class Routes
 */
export default (
  <Route path='/'>
    <DefaultRoute handler={Main}/>
  </Route>
);