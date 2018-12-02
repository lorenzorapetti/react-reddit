import { createStyles, withStyles, WithStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useState, useEffect, FunctionComponent } from 'react';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import Content from './components/Content';
import { TitleContext } from './context';
import { themeDark, themeLight } from './themes';

const styles = () =>
  createStyles({
    root: {
      display: 'flex',
    },
  });

export interface IAppProps extends WithStyles<typeof styles> {}

const App: FunctionComponent<IAppProps> = ({ classes }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);
  const baseTitle = 'React Reddit';
  const [title, setTitle] = useState(baseTitle);

  useEffect(
    () => {
      if (document.title !== title) {
        document.title = title && title !== baseTitle ? `${title} - ${baseTitle}` : baseTitle;
      }
    },
    [title],
  );

  function handleDrawerToggleClick() {
    setDrawerOpen(!drawerOpen);
  }

  function handleDrawerClose() {
    if (drawerOpen) setDrawerOpen(false);
  }

  function handleThemeToggleClick() {
    setLightTheme(!lightTheme);
  }

  const theme = lightTheme ? themeLight : themeDark;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <TitleContext.Provider value={{ title, setTitle }}>
        <div className={classes.root}>
          <Header
            onDrawerToggleClick={handleDrawerToggleClick}
            onThemeToggleClick={handleThemeToggleClick}
          />
          <NavigationDrawer drawerOpen={drawerOpen} onDrawerClosed={handleDrawerClose} />
          <Content drawerOpen={drawerOpen} />
        </div>
      </TitleContext.Provider>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);
