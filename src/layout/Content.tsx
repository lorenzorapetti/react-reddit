import React, { FunctionComponent } from 'react';
import { Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth, isWidthDown } from '@material-ui/core/withWidth';
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
      <Typography>Content</Typography>
    </main>
  );
};

export default withWidth()(withStyles(styles)(Content));
