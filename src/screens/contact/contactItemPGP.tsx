import { SnackbarContext } from '$components/snackbar';
import { VpnKey } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from '@mui/material';
import React from 'react';
import ContactItem from './contactItem';
import MenuItemLink from './menuItemLink';

const PGPKeyFile = '/pgp_pubkey.asc';
const PGPKeyFingerprint = '2AAC7A39280B83CF344ADAAE62C1D6CADBB373CD';

export default function ContactItemPGP(): React.ReactElement {
  const PGPAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  }));

  function renderReadableFingerprint(): string {
    const readable = PGPKeyFingerprint.match(/.{1,4}/g);
    if (readable === null) return PGPKeyFingerprint;
    return readable.join(' ');
  }

  return (
    <ContactItem
      avatar={
        <PGPAvatar alt="PGP Icon">
          <VpnKey />
        </PGPAvatar>
      }
      menu={MenuPGP}
      primaryText="PGP"
      secondaryText={renderReadableFingerprint()}
    />
  );
}

function MenuPGP({ anchorEl, onClose, open }: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  function handleCopyFingerprint(): void {
    navigator.clipboard.writeText(PGPKeyFingerprint);
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP public key fingerprint copied to clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  function handleCopyHexFingerprint(): void {
    navigator.clipboard.writeText('0x' + PGPKeyFingerprint);
    if (snackbarCtx)
      snackbarCtx.pushMessage(
        'PGP public key fingerprint (0x) copied to clipboard',
      );
    if (onClose) onClose({}, 'backdropClick');
  }

  function handleDownloadASC(): void {
    if (snackbarCtx) snackbarCtx.pushMessage('PGP public key download started');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        if (onClose) onClose({}, 'backdropClick');
      }}
    >
      <MenuItem onClick={handleCopyFingerprint}>Copy Fingerprint</MenuItem>
      <MenuItem onClick={handleCopyHexFingerprint}>
        Copy Fingerprint &#40;0x&#41;
      </MenuItem>
      <MenuItemLink href={PGPKeyFile} onClick={handleDownloadASC}>
        Download ASCII armored key
      </MenuItemLink>
      <MenuItem
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
          setDialogOpen(true);
        }}
      >
        View Key
      </MenuItem>
      <DialogPGP open={dialogOpen} setOpen={setDialogOpen} />
    </Menu>
  );
}

interface DialogPGPProps {
  open: boolean;
  setOpen(value: React.SetStateAction<boolean>): void;
}

function DialogPGP({ open, setOpen }: DialogPGPProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);
  const [content, setContent] = React.useState<string>('Loading...');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isLoading) return;
    fetch(PGPKeyFile)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.text();
      })
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = 'There was an error fetching the PGP key:\n' + err;
        setContent(errorMessage);
        setIsLoading(false);
        console.error(err);
      });
  }, [content]);

  function handleCopyKeyContent(): void {
    navigator.clipboard.writeText(content);
    if (snackbarCtx)
      snackbarCtx.pushMessage('PGP public key copied to clipboard');
    setOpen(false);
  }

  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth={false}>
      <DialogTitle>PGP Public Key</DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyKeyContent}
        >
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
