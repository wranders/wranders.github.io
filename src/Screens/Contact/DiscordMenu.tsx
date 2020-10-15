import { ContactItemMenuProps } from '@Components/ContactItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { info } from './Contact';

export default function DiscordMenu({
  anchorEl,
  open,
  onClose,
  snackbarFunc,
}: ContactItemMenuProps): React.ReactElement {
  function copyHandle() {
    navigator.clipboard.writeText(info.discord.handle);
    if (snackbarFunc) snackbarFunc('Discord Username Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
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
      <MenuItem onClick={copyHandle}>Copy Username</MenuItem>
    </Menu>
  );
}
