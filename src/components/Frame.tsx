import React from 'react';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    images: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  });

interface Props extends WithStyles<typeof styles> {
  images: any[];
}

export const Frame: React.FC<Props> = ({ images, classes }) => (
  <div className={classes.root}>
    {images.map(({ link, label }) => (
      <div
        className={classes.images}
        style={{ backgroundImage: `url('${link}')` }}
      />
    ))}
  </div>
);

export default withStyles(styles)(Frame);
