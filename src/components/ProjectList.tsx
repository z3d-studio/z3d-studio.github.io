import React from 'react';
import Link from 'next/link';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () =>
  createStyles({
    projects: {
      backgroundSize: 'center 30%',
      filter: 'grayscale(90%)',
      cursor: 'pointer',
      transition: '0.8s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&:hover': {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'grayscale(0%)',
        transition: '0.8s',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  projects: any[];
}

export const ProjectList: React.FC<Props> = ({ projects, classes }) => {
  return (
    <>
      {projects.map(({ image, slug, title }) => (
        <div
          key={image.label}
          className={classes.projects}
          style={{ backgroundImage: `url('${image.link}')` }}
        >
          <Link href={`/${slug}`} passHref>
            <Button color="default" variant="outlined" component="a">
              {title}
            </Button>
          </Link>
        </div>
      ))}
    </>
  );
};

export default withStyles(styles)(ProjectList);
