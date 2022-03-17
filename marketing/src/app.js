import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// to prevent collisions between default generated classname in material ui
// we customize it

// generated classnamme by default are jss1, jss2, jss3
// and this might cause some collision between different projects
// so by this setting classname would be ma1, ma2, ma3, ... .

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

export default function ({ history }) {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path={'/pricing'} component={Pricing} />
            <Route exact path={'/'} component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
}
