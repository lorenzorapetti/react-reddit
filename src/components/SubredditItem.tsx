import React, { FunctionComponent, memo } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import isUrl from 'is-url';
import formatDistance from 'date-fns/formatDistance';
import pluralize from 'pluralize';
import { humanize } from '../utils/number';

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit * 2;

  return createStyles({
    paper: {
      padding: spacing,
      display: 'flex',
      alignItems: 'center',
    },
    score: {
      fontWeight: 700,
      width: 40,
      paddingRight: spacing,
      display: 'flex',
      justifyContent: 'center',
    },
    thumbnailWrapper: {
      height: 60,
      flex: '0 0 80px',
      marginRight: spacing,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0',
      alignSelf: 'stretch',
    },
    title: {
      fontSize: '1rem',
      fontWeight: 500,
      marginBottom: theme.spacing.unit / 2,
    },
    postInfo: {
      display: 'flex',
    },
    subredditName: {
      color: theme.palette.text.primary,
      fontWeight: 700,
    },
  });
};

export interface ISubredditItemProps extends WithStyles<typeof styles> {
  post: any;
}

const SubredditItem: FunctionComponent<ISubredditItemProps> = memo(({ post, classes }) => {
  const created = formatDistance(post.created_utc * 1000, Date.now(), {
    addSuffix: true,
  });
  const score = humanize(post.score, { precision: 1 });
  const comments = humanize(post.num_comments, { precision: 1 });

  return (
    <div className={classes.paper}>
      <Typography className={classes.score} data-testid="score">
        {score}
      </Typography>
      <div className={classes.thumbnailWrapper}>
        <div
          className={classes.thumbnail}
          style={{
            background: isUrl(post.thumbnail) ? `url(${post.thumbnail})` : '',
          }}
          data-testid="thumbnail"
        >
          {!isUrl(post.thumbnail) && <CommentIcon />}
        </div>
      </div>
      <div className={classes.content}>
        <Typography variant="h2" className={classes.title} data-testid="title">
          {post.title}
        </Typography>
        <div className={classes.postInfo} data-testid="info">
          <Typography variant="caption">
            <span className={classes.subredditName}>{post.subreddit_name_prefixed} •</span> Posted
            by u/{post.author} {created} <strong>•</strong> {comments}{' '}
            {pluralize('comment', post.num_comments)}
          </Typography>
        </div>
      </div>
    </div>
  );
});

export default withStyles(styles)(SubredditItem);
