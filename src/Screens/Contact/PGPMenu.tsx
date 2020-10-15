import { ContactItemMenuDialogProps } from '@Components/ContactItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { info } from './Contact';

export default function PGPMenu({
  anchorEl,
  open,
  onClose,
  snackbarFunc,
  dialogTitleFunc,
  dialogContentFunc,
  dialogActionFunc,
  dialogOpenFunc,
  dialogCloseFunc,
}: ContactItemMenuDialogProps): React.ReactElement {
  const [dialogContent, setDialogContent] = React.useState<string | undefined>(
    undefined,
  );

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
    if (dialogCloseFunc) dialogCloseFunc();
  }

  function DownloadASC(): void {
    if (snackbarFunc) snackbarFunc('PGP Public Key Download Started');
    if (onClose) onClose({}, 'backdropClick');
  }

  function ViewKeyDialog(): void {
    if (dialogTitleFunc) dialogTitleFunc('PGP Key');
    if (typeof dialogContent === 'undefined') {
      if (dialogContentFunc) dialogContentFunc('Loading...');
      fetch(info.pgp.file)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.text();
        })
        .then((text) => {
          setDialogContent(text);
          if (dialogContentFunc) dialogContentFunc(text);
        })
        .catch((err) => {
          const errMsg = 'There was an error fetching the PGP key:\n' + err;
          if (dialogContentFunc) dialogContentFunc(errMsg);
          console.error(err);
        });
    } else {
      if (dialogContentFunc) dialogContentFunc(dialogContent);
    }
    if (dialogActionFunc)
      dialogActionFunc(
        <Button variant="contained" color="primary" onClick={CopyKeyContent}>
          Copy
        </Button>,
      );
    if (onClose) onClose({}, 'backdropClick');
    if (dialogOpenFunc) dialogOpenFunc();
  }

  return (
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
      <MenuItem onClick={ViewKeyDialog}>View Key</MenuItem>
    </Menu>
  );
}
