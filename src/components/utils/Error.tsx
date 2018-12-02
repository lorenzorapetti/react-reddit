import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import classNames from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    error: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    gutters: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    text: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

export interface IErrorProps extends WithStyles<typeof styles> {
  message?: string;
  buttonMessage?: string;
  gutters?: boolean;
  onButtonClick?(): void;
}

const Error: FunctionComponent<IErrorProps> = React.memo(
  ({ classes, onButtonClick, message, buttonMessage, gutters = false }) => {
    return (
      <div
        className={classNames(classes.error, {
          [classes.gutters]: gutters,
        })}
      >
        <ReportIcon style={{ fontSize: 80 }} color="disabled" />
        <Typography variant="body1" className={classes.text}>
          {message || 'Oops, something went wrong'}
        </Typography>
        <Button color="primary" onClick={onButtonClick}>
          {buttonMessage || 'Retry'}
        </Button>
      </div>
    );
  },
);

export default withStyles(styles)(Error);
