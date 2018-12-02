import React, { FunctionComponent, Suspense, lazy } from 'react';
import { Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth, isWidthDown } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import { Router } from '@reach/router';
import { drawerWidth } from '../themes';
import Loading from './utils/Loading';

const Subreddit = lazy(() => import('../pages/Subreddit'));

const styles = (theme: Theme) => {
  const padding = theme.spacing.unit * 3;

  return createStyles({
    main: {
      padding: `${48 + padding}px ${padding}px ${padding}px ${padding}px`,
      flexGrow: 1,
      marginLeft: -drawerWidth,
    },
    mainShift: {
      marginLeft: 0,
    },
  });
};

export interface IContentProps extends WithStyles<typeof styles>, WithWidth {
  drawerOpen?: boolean;
}

const Content: FunctionComponent<IContentProps> = ({ classes, drawerOpen, width }) => {
  return (
    <main
      className={classNames(
        classes.main,
        (drawerOpen || isWidthDown('sm', width)) && classes.mainShift,
      )}
    >
      <Suspense fallback={<Loading />}>
        <Router>
          <Subreddit path="/" />
          <Subreddit path="/r/:subreddit" />
        </Router>
      </Suspense>
    </main>
  );
};

export default withWidth()(withStyles(styles)(Content));
