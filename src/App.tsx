import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, FunctionComponent } from 'react';
import Header from './layout/Header';
import NavigationDrawer from './layout/NavigationDrawer';
import Content from './layout/Content';
import { TitleContext } from './context';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
  });

export interface IAppProps extends WithStyles<typeof styles> {}

const App: FunctionComponent<IAppProps> = ({ classes }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
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

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      <div className={classes.root}>
        <Header onDrawerToggleClick={handleDrawerToggleClick} />
        <NavigationDrawer drawerOpen={drawerOpen} />
        <Content drawerOpen={drawerOpen} />
      </div>
    </TitleContext.Provider>
  );
};

export default withStyles(styles)(App);
