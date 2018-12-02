import React, { FunctionComponent } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';

const styles = (theme: Theme) =>
  createStyles({
    error: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    text: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

export interface IErrorProps extends WithStyles<typeof styles> {
  message?: string;
  buttonMessage?: string;
  onButtonClick?(): void;
}

const Error: FunctionComponent<IErrorProps> = React.memo(
  ({ classes, onButtonClick, message, buttonMessage }) => {
    return (
      <div className={classes.error}>
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
