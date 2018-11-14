import React, { FunctionComponent } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth, isWidthDown } from '@material-ui/core/withWidth';
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

export interface INavigationDrawerProps extends WithStyles<typeof styles>, WithWidth {
  drawerOpen?: boolean;
  onDrawerClosed?: () => void;
}

const NavigationDrawer: FunctionComponent<INavigationDrawerProps> = ({
  classes,
  drawerOpen = true,
  onDrawerClosed,
  width,
}) => {
  return (
    <Drawer
      className={classes.drawer}
      variant={isWidthDown('sm', width) ? 'temporary' : 'persistent'}
      anchor="left"
      open={drawerOpen}
      onClose={onDrawerClosed}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ keepMounted: true }}
    >
      <div className={classes.toolbar} />
    </Drawer>
  );
};

export default withWidth()(withStyles(styles)(NavigationDrawer));
