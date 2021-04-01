import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';

import { AppProps } from 'next/dist/next-server/lib/router/router';

export const Z3DApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default Z3DApp;
