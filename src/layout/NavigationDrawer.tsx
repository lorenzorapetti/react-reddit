import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth, isWidthDown } from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import Loading from '../utils/Loading';
import { drawerWidth } from '../themes';
import useReddit from '../hooks/useReddit';

const styles = () =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      paddingTop: 48,
    },
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
  const { loading } = useReddit('subreddits/default');

  return (
    <Drawer
      className={classes.drawer}
      variant={isWidthDown('sm', width) ? 'temporary' : 'persistent'}
      anchor="left"
      open={drawerOpen}
      onClose={onDrawerClosed}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ keepMounted: true }}
      data-testid="navigation-drawer"
    >
      {loading && <Loading />}
    </Drawer>
  );
};

export default withWidth()(withStyles(styles)(NavigationDrawer));
