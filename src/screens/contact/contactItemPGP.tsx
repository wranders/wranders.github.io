import { SnackbarContext } from '@components/snackbar';
import {
  Avatar,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Menu,
  MenuItem,
  MenuProps,
} from '@material-ui/core';
import { VpnKey } from '@material-ui/icons';
import React from 'react';
import ContactItem from './contactItem';
import MenuItemLink from './menuItemLink';

const keyfile = '/pgp_pubkey.asc';
const keyFingerprint = 'BFD9 DFF2 3686 CB17 B2CF 7E1A 5F5D 48D0 D507 7519';

export interface ContactItemPGPProps {
  className?: string;
}

export default function ContactItemPGP({
  className,
}: ContactItemPGPProps): React.ReactElement {
  return (
    <ContactItem
      avatar={
        <Avatar alt="PGP Icon" className={className}>
          <VpnKey />
        </Avatar>
      }
      menu={MenuPGP}
      primaryText="PGP"
      secondaryText={keyFingerprint}
    />
  );
}

function MenuPGP({ anchorEl, onClose, open }: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  function CopyFingerprint(): void {
    navigator.clipboard.writeText(keyFingerprint);
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP Public Key Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  function CopyHexFingerprint(): void {
    navigator.clipboard.writeText('0x' + keyFingerprint.replace(/\s/g, ''));
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP Public Key Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  function DownloadASC(): void {
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP Public Key Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }
  return (
    <div>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        <MenuItem onClick={CopyFingerprint}>Copy Fingerprint</MenuItem>
        <MenuItem onClick={CopyHexFingerprint}>
          Copy Fingerprint &#40;0x&#41;
        </MenuItem>
        <MenuItemLink href={keyfile} onClick={DownloadASC}>
          Download ASCII Armored Key
        </MenuItemLink>
        <MenuItem
          onClick={() => {
            if (onClose) onClose({}, 'backdropClick');
            setDialogOpen(true);
          }}
        >
          View Key
        </MenuItem>
      </Menu>
      <DialogPGP open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}

interface DialogPGPProps {
  open: boolean;
  setOpen(value: React.SetStateAction<boolean>): void;
}

function DialogPGP({ open, setOpen }: DialogPGPProps): React.ReactElement {
  const classes = makeStyles(() =>
    createStyles({
      keyContent: {
        fontFamily: 'monospace',
        whiteSpace: 'pre',
      },
    }),
  )();
  const snackbarCtx = React.useContext(SnackbarContext);
  const [content, setContent] = React.useState<string>('Loading...');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isLoading) return;
    fetch(keyfile)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.text();
      })
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch((err) => {
        const errMsg = 'There was an error fetching the PGP key:\n' + err;
        setContent(errMsg);
        setIsLoading(false);
        console.error(err);
      });
  }, [content]);

  function CopyKeyContent(): void {
    navigator.clipboard.writeText(content);
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP Public Key Copied to Clipboard');
    setOpen(false);
  }

  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth={false}>
      <DialogTitle>PGP Key</DialogTitle>
      <DialogContent dividers>
        <DialogContentText className={classes.keyContent}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={CopyKeyContent}>
          Copy
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
