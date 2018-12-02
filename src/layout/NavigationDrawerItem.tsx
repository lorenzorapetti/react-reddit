import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Reddit from 'mdi-material-ui/Reddit';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing.unit * 3,
      height: theme.spacing.unit * 3,
    },
    icon: {
      marginRight: 0,
    },
  });

export interface INavigationDrawerItemProps extends WithStyles<typeof styles> {
  subreddit: any;
}

const NavigationDrawerItem: FunctionComponent<INavigationDrawerItemProps> = React.memo(
  ({ classes, subreddit }) => {
    return (
      <ListItem button={true}>
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
        <ListItemText primary={subreddit.display_name_prefixed} />
      </ListItem>
    );
  },
);

export default withStyles(styles)(NavigationDrawerItem);
