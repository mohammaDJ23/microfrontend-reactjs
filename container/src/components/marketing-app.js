import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
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

      // in marketing app it does not need to set history location
      // because we have a route such "/".. but to be sure everything is gonna work
      // correctly we must pass pathname to marketing project too
      // because we way decide to change the path.

      initialPath: history.location.pathname,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
