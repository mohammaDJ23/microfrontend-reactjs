import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  // run the marketing app in here!

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
