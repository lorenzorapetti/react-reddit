import React, { useContext, FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TitleContext } from '../context';

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export interface IHeaderProps extends WithStyles<typeof styles> {
  onDrawerToggleClick?: () => void;
}

const Header: FunctionComponent<IHeaderProps> = ({ classes, onDrawerToggleClick }) => {
  const { title } = useContext(TitleContext);

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          className={classes.menuButton}
          onClick={onDrawerToggleClick}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className="grow">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
