import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/progress';

const MarketingApp = lazy(() => import('./components/marketing-app'));
const AuthApp = lazy(() => import('./components/auth-app'));

// to prevent collisions between default generated classname in material ui
// we customize it

// generated classnamme by default are jss1, jss2, jss3
// and this might cause some collision between different projects
// so by this setting classname would be co1, co2, co3, ... .

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />

        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path={'/auth'}>
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>

            <Route path={'/'} component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
