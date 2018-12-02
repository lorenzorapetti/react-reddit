import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NProgress from 'nprogress';
import useReddit from '../hooks/useReddit';
import Error from '../components/utils/Error';

const styles = (theme: Theme) =>
  createStyles({
    error: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

export interface ISubredditProps extends RouteComponentProps, WithStyles<typeof styles> {}

const Subreddit: FunctionComponent<ISubredditProps> = ({ location }) => {
  NProgress.start();

  const { error, retry } = useReddit(location ? location.pathname : '/', {
    onSuccess: () => NProgress.done(),
    onFail: () => NProgress.done(),
  });

  return <Paper>{error && <Error onButtonClick={retry} gutters={true} />}</Paper>;
};

export default withStyles(styles)(Subreddit);
