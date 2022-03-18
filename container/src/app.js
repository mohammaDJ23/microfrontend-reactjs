import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/progress';
import { createBrowserHistory } from 'history';

const MarketingApp = lazy(() => import('./components/marketing-app'));
const AuthApp = lazy(() => import('./components/auth-app'));
const DashboardApp = lazy(() => import('./components/dashboard'));

// to prevent collisions between default generated classname in material ui
// we customize it

// generated classnamme by default are jss1, jss2, jss3
// and this might cause some collision between different projects
// so by this setting classname would be co1, co2, co3, ... .

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />

        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path={'/auth'}>
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>

            <Route path={'/dashboard'}>
              {!isSignedIn && <Redirect to={'/'} />}
              <DashboardApp />
            </Route>
            <Route path={'/'} component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
