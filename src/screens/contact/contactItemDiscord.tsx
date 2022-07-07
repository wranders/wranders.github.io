import { Avatar, Menu, MenuItem, MenuProps } from '@material-ui/core';
import React from 'react';

import { SnackbarContext } from '@components/snackbar';
import ContactItem from './contactItem';

const discordIconSrc = '/static/icons/discord-icon-245x240.png';
const handle = 'doUbleU#2047';

export default function ContactItemDiscord(): React.ReactElement {
  return (
    <ContactItem
      avatar={<Avatar alt="Discord Icon" src={discordIconSrc} />}
      menu={MenuDiscord}
      primaryText="Discord"
      secondaryText={handle}
    />
  );
}

function MenuDiscord({
  anchorEl,
  onClose,
  open,
}: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);

  function copyHandle(): void {
    navigator.clipboard.writeText(handle);
    if (snackbarCtx)
      snackbarCtx.pushMessage('Discord Username Copied to Clipboards');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={onClose}>
      <MenuItem onClick={copyHandle}>Copy Username</MenuItem>
    </Menu>
  );
}
