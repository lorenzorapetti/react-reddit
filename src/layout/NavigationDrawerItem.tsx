import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Reddit from 'mdi-material-ui/Reddit';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { Link } from '@reach/router';

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing.unit * 3,
      height: theme.spacing.unit * 3,
    },
    icon: {
      marginRight: 0,
    },
    activeLink: {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  });

export interface INavigationDrawerItemProps extends WithStyles<typeof styles> {
  subreddit: any;
  isActive?: boolean;
}

const NavigationDrawerItem: FunctionComponent<INavigationDrawerItemProps> = React.memo(
  ({ classes, subreddit, isActive }) => {
    function SubredditLink(props: ListItemProps) {
      return <Link to={subreddit.url} {...props} />;
    }

    return (
      <ListItem button={true} component={SubredditLink}>
        {subreddit.icon_img ? (
          <ListItemAvatar>
            <Avatar
              alt={subreddit.display_name_prefixed}
              src={subreddit.icon_img}
              className={classNames(classes.icon, classes.avatar)}
              data-testid="avatar"
            />
          </ListItemAvatar>
        ) : (
          <ListItemIcon className={classes.icon}>
            <Reddit data-testid="icon" />
          </ListItemIcon>
        )}
        <ListItemText
          primary={subreddit.display_name_prefixed}
          classes={{
            primary: classNames({
              [classes.activeLink]: isActive,
            }),
          }}
        />
      </ListItem>
    );
  },
);

export default withStyles(styles)(NavigationDrawerItem);
