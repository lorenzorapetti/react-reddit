import React, { FunctionComponent } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { drawerWidth } from '../themes';

const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  });

export interface INavigationDrawerProps extends WithStyles<typeof styles> {
  drawerOpen?: boolean;
}

const NavigationDrawer: FunctionComponent<INavigationDrawerProps> = ({
  classes,
  drawerOpen = true,
}) => {
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={drawerOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbar} />
    </Drawer>
  );
};

export default withStyles(styles)(NavigationDrawer);
