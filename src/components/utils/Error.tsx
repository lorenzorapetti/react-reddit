import React, { FunctionComponent } from 'react';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
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
  }),
);

export interface IErrorProps {
  message?: string;
  buttonMessage?: string;
  gutters?: boolean;
  onButtonClick?(event: React.MouseEvent<HTMLElement>): void;
}

const Error: FunctionComponent<IErrorProps> = React.memo(
  ({ onButtonClick, message, buttonMessage, gutters = false }) => {
    const classes = useStyles();

    return (
      <div
        data-testid="error"
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

export default Error;
