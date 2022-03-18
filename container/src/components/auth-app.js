import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  // run the marketing app in here!

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // this function callback is for everytime the user changes the navigation
      // from sub app we want to know the next path in the container and
      // change the url of the container too

      onNavigate: function ({ pathname: nextPathname }) {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },

      // this callback is for when the user sign up or sign in

      onSignIn,

      // pass the initial path to auth because the initial path in
      // auth is "/" and we don't any route such a thing and becuase of it
      // onParentNavigate will not trigger.
      // we have to tell auth to set inital path from container.

      initialPath: history.location.pathname,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
