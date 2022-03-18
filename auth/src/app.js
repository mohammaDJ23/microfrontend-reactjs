import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/signin';
import Signup from './components/signup';

// to prevent collisions between default generated classname in material ui
// we customize it

// generated classnamme by default are jss1, jss2, jss3
// and this might cause some collision between different projects
// so by this setting classname would be au1, au2, au3, ... .

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default function ({ history, onSignIn }) {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
}
