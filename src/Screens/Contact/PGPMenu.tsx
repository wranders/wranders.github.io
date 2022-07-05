import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { info } from './Contact';
import { ContactItemMenuProps } from './ContactItem';

export default function PGPMenu({
  anchorEl,
  open,
  onClose,
  snackbarFunc,
}: ContactItemMenuProps): React.ReactElement {
  const classes = makeStyles(() =>
    createStyles({
      keyContent: {
        fontFamily: 'monospace',
        whiteSpace: 'pre',
      },
    }),
  )();
  const [dialogContent, setDialogContent] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDialogContent('Loading...');
    fetch(info.pgp.file)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.text();
      })
      .then((text) => {
        setDialogContent(text);
      })
      .catch((err) => {
        const errMsg = 'There was an error fetching the PGP key:\n' + err;
        setDialogContent(errMsg);
        console.error(err);
      });
  }, [dialogContent]);

  function CopyFingerprint(): void {
    navigator.clipboard.writeText(info.pgp.fingerprint);
    if (snackbarFunc) snackbarFunc('PGP Fingerprint Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  function CopyHexFingerprint(): void {
    navigator.clipboard.writeText(
      '0x' + info.pgp.fingerprint.replace(/\s/g, ''),
    );
    if (snackbarFunc) snackbarFunc('PGP Fingerprint (0x) Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  function CopyKeyContent(): void {
    navigator.clipboard.writeText(dialogContent as string);
    if (snackbarFunc) snackbarFunc('PGP Public Key Copied to Clipboard');
    setDialogOpen(false);
  }

  function DownloadASC(): void {
    if (snackbarFunc) snackbarFunc('PGP Public Key Download Started');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        <MenuItem onClick={CopyFingerprint}>Copy Fingerprint</MenuItem>
        <MenuItem onClick={CopyHexFingerprint}>
          Copy Fingerprint &#40;0x&#41;
        </MenuItem>
        <MenuItem component="a" href={info.pgp.file} onClick={DownloadASC}>
          Download ASCII Armored Key
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (onClose) onClose({}, 'backdropClick');
            setDialogOpen(true);
          }}
        >
          View Key
        </MenuItem>
      </Menu>
      <Dialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        maxWidth={false}
      >
        <DialogTitle>PGP Key</DialogTitle>
        <DialogContent dividers>
          <DialogContentText className={classes.keyContent}>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={CopyKeyContent}>
            Copy
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
