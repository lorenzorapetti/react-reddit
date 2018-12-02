import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () =>
  createStyles({
    loading: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export interface ILoadingProps extends WithStyles<typeof styles> {}

const Loading: FunctionComponent<ILoadingProps> = React.memo(({ classes }) => {
  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
});

export default withStyles(styles)(Loading);
