import {
  createStyles,
  IconButton,
  makeStyles,
  Snackbar as MuiSnackbar,
  Theme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import SnackbarContext from './snackbarContext';

export type SnackbarEntry = {
  key: number;
  message: string;
};

export interface SnackbarProps {
  children?: React.ReactNode | Array<React.ReactNode>;
}

export default function Snackbar({
  children,
}: SnackbarProps): React.ReactElement {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      close: {
        padding: theme.spacing(0.5),
      },
    }),
  )();

  const messages = React.useState<Array<SnackbarEntry>>([])[0];
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<SnackbarEntry | undefined>(
    undefined,
  );

  function processQueue(): void {
    if (messages.length > 0) {
      setMessage(messages.shift());
      setOpen(true);
    }
  }

  function pushMessage(msg: string): void {
    messages.push({
      message: msg,
      key: new Date().getTime(),
    });
    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  }

  return (
    <SnackbarContext.Provider value={{ pushMessage: pushMessage }}>
      {children}
      <MuiSnackbar
        key={message ? message.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        onExited={() => processQueue()}
        message={message ? message.message : undefined}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        }
      ></MuiSnackbar>
    </SnackbarContext.Provider>
  );
}
