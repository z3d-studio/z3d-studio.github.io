import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      height: `calc(${theme.mixins.toolbar.minHeight}px - ${theme.spacing(
        3
      )}px)`,
    },
  });

export const Header: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <AppBar elevation={0} color="default">
    <Toolbar>
      <img className={classes.logo} src="/home/logo.png" />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
