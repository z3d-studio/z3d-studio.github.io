import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    tags: {
      margin: `${theme.spacing(2)}px auto`,

      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  title: string;
  tags: string[];
  content: string;
}

export const PortifolioContent: React.FC<Props> = ({
  title,
  tags,
  content,
  classes,
}) => (
  <Paper className={classes.root}>
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
    <div className={classes.tags}>
      {tags.map((tag) => (
        <Chip key={tag} label={`#${tag}`} />
      ))}
    </div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </Paper>
);

export default withStyles(styles)(PortifolioContent);
