import { SnackbarContext } from '$components/snackbar';
import { Avatar, Menu, MenuItem, MenuProps } from '@mui/material';
import React from 'react';
import ContactItem from './contactItem';

const DiscordIconSource = '/static/icons/discord-icon-245x240.png';
const DiscordHandle = 'doUbleU#2047';

export default function ContactItemDiscord(): React.ReactElement {
  return (
    <ContactItem
      avatar={<Avatar alt="Discord Icon" src={DiscordIconSource} />}
      menu={MenuDiscord}
      primaryText="Discord"
      secondaryText={DiscordHandle}
    />
  );
}

function MenuDiscord({
  anchorEl,
  onClose,
  open,
}: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);

  function handleCopyHandle(): void {
    navigator.clipboard.writeText(DiscordHandle);
    if (snackbarCtx)
      snackbarCtx.pushMessage('Discord username copied to clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <Menu keepMounted anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={handleCopyHandle}>Copy username</MenuItem>
    </Menu>
  );
}
