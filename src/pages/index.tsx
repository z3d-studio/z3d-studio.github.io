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
