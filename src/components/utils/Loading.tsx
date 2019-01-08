import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(
  createStyles({
    loading: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const Loading: FunctionComponent<{}> = React.memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
});

export default Loading;
