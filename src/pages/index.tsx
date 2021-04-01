import React from 'react';
import Head from 'next/head';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    container: {
      position: 'fixed',
      top: 0,
      left: -1,
      right: -1,
      height: '100vh',
      overflow: 'hidden',
      background: '#000',

      '& > video': {
        opacity: 0.5,
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        width: '100%',
      },
    },
    logo: {
      position: 'absolute',
      zIndex: 2,
      width: '300px',
      left: 'calc(50% - 150px)',
      top: 'calc(50% - 65px)',
    },
  });

export const Home: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <>
    <Head>
      <title>Z3D Studio</title>
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
    <img className={classes.logo} src="/home/logo.png" />
    <div className={classes.container}>
      <video autoPlay muted loop id="myVideo">
        <source src="/home/background.mp4" type="video/mp4" />
      </video>
    </div>
  </>
);

export default withStyles(styles)(Home);
