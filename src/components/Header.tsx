import React, { useContext, FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme, WithTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import Palette from '@material-ui/icons/Palette';
import PaletteOutlined from '@material-ui/icons/PaletteOutlined';
import { TitleContext } from '../context';
import GithubIcon from '../icons/Github';

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

export interface IHeaderProps extends WithStyles<typeof styles>, WithTheme {
  onDrawerToggleClick?: () => void;
  onThemeToggleClick?: () => void;
}

const Header: FunctionComponent<IHeaderProps> = ({
  classes,
  onDrawerToggleClick,
  onThemeToggleClick,
  theme,
}) => {
  const { title } = useContext(TitleContext);
  const githubLink = 'https://github.com/loryman/react-reddit';
  const lightTheme = theme.palette.type === 'light';

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          className={classes.menuButton}
          onClick={onDrawerToggleClick}
          color="inherit"
          aria-label="Menu"
          data-testid="drawer-button"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className="grow">
          {title}
        </Typography>
        <div>
          <Tooltip title={lightTheme ? 'Set dark theme' : 'Set light theme'}>
            <IconButton
              onClick={onThemeToggleClick}
              color="inherit"
              aria-label={lightTheme ? 'Set dark theme' : 'Set light theme'}
              data-testid="theme-button"
            >
              {lightTheme ? <PaletteOutlined /> : <Palette />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Github">
            <IconButton
              color="inherit"
              aria-label="Github"
              href={githubLink}
              target="_blank"
              rel="noopener"
            >
              <GithubIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
