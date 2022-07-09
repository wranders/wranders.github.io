import {
  IconButton,
  IconButtonProps,
  Snackbar,
  SnackbarOrigin,
  styled,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react';
import SnackbarContext from './snackbarContext';

interface SnackbarEntry {
  key: number;
  message: string;
}

interface SnackbarProviderProps {
  anchorOrgin?: SnackbarOrigin;
  children?: React.ReactNode | Array<React.ReactNode>;
}

export default function SnackbarProvider({
  anchorOrgin,
  children,
}: SnackbarProviderProps): React.ReactElement {
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
    open ? setOpen(false) : processQueue();
  }

  return (
    <SnackbarContext.Provider value={{ pushMessage: pushMessage }}>
      {children}
      <Snackbar
        key={message ? message.key : undefined}
        message={message ? message.message : undefined}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        action={
          <SnackbarClose
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <Close />
          </SnackbarClose>
        }
        anchorOrigin={anchorOrgin}
      />
    </SnackbarContext.Provider>
  );
}

const SnackbarClose = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  padding: theme.spacing(0.5),
}));
