import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './app';

function mount(el, { onNavigate, defaultHistory }) {
  // defaultHistory is for development propose when this app running without container, to show the current page
  // in the url to the developer, otherwise
  // the developer can't see the current page in url tab
  // because we are using cache routing in this sub project.
  // if our app is called from parent use createMemoryHistory()
  // the result of the object history are same.

  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_marketing-dev-root');

  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
