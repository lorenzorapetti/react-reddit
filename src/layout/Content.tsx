import React, { FunctionComponent } from 'react';
import { Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { drawerWidth } from '../themes';

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
    appHeader: {
      flexGrow: 1,
      ...theme.mixins.toolbar,
    },
  });
};

export interface IContentProps extends WithStyles<typeof styles> {
  drawerOpen?: boolean;
}

const Content: FunctionComponent<IContentProps> = ({ classes, drawerOpen }) => {
  return (
    <main className={classNames(classes.main, drawerOpen && classes.mainShift)}>
      <Typography>Content</Typography>
    </main>
  );
};

export default withStyles(styles)(Content);
