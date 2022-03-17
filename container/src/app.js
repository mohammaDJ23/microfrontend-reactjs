import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './components/marketing-app';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// to prevent collisions between default generated classname in material ui
// we customize it

// generated classnamme by default are jss1, jss2, jss3
// and this might cause some collision between different projects
// so by this setting classname would be co1, co2, co3, ... .

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
