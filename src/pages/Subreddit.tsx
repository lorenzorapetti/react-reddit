import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NProgress from 'nprogress';
import { useReddit } from '../hooks';
import { TitleContext } from '../context';
import Error from '../components/utils/Error';
import SubredditItem from '../components/SubredditItem';

const styles = (theme: Theme) =>
  createStyles({
    error: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

export interface ISubredditProps extends RouteComponentProps, WithStyles<typeof styles> {}

const Subreddit: FunctionComponent<ISubredditProps> = ({ location, uri }) => {
  const { setTitle } = useContext(TitleContext);

  const { error, retry, loading, data } = useReddit(location ? location.pathname : '/', {
    onSuccess: () => {
      setTitle(location && uri && location.pathname !== '/' ? uri : 'Homepage');
    },
  });

  if (loading && !NProgress.isStarted()) {
    NProgress.start();
  } else if (NProgress.isStarted()) {
    NProgress.done();
  }

  return (
    <Paper data-testid="posts-container">
      {error && <Error onButtonClick={retry} gutters={true} />}
      {data && data.map((post: any) => <SubredditItem key={post.id} post={post} />)}
    </Paper>
  );
};

export default withStyles(styles)(Subreddit);
