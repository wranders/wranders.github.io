import { SnackbarContext } from '$components/snackbar';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import ContactItem from './contactItem';

const SessionIconSource = '/static/icons/session-icon-50x50.png';
const SessionID =
  '053694db7f58e3d251e5f7ec22621e4db1eca23dad4e07805f10ef92a2724c596d';

export default function ContactItemSession(): React.ReactElement {
  return (
    <ContactItem
      avatar={<Avatar alt="Session Icon" src={SessionIconSource} />}
      menu={MenuSession}
      primaryText="Session"
      secondaryText={SessionID}
      style={{ overflowWrap: 'break-word' }}
    />
  );
}

function MenuSession({
  anchorEl,
  onClose,
  open,
}: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  function handleCopyID(): void {
    navigator.clipboard.writeText(SessionID);
    if (snackbarCtx) snackbarCtx.pushMessage('Session ID copied to clipboard');
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
      <MenuItem onClick={handleCopyID}>Copy Session ID</MenuItem>
      <MenuItem
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
          setDialogOpen(true);
        }}
      >
        View QR Code
      </MenuItem>
      <DialogSession open={dialogOpen} setOpen={setDialogOpen} />
    </Menu>
  );
}

interface DialogSessionProps {
  open: boolean;
  setOpen(value: React.SetStateAction<boolean>): void;
}

function DialogSession({
  open,
  setOpen,
}: DialogSessionProps): React.ReactElement {
  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth={false}>
      <DialogTitle>Session ID</DialogTitle>
      <DialogContent>
        <QRCodeSVG
          value={SessionID}
          size={256}
          includeMargin={true}
          level={'H'}
          imageSettings={{
            src: SessionIconSource,
            height: 50,
            width: 50,
            excavate: true,
          }}
        />
      </DialogContent>
      <DialogActions>
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
