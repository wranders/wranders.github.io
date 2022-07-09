import { Avatar, Menu, MenuProps } from '@mui/material';
import React from 'react';
import ContactItem from './contactItem';
import MenuItemLink from './menuItemLink';

const KeybaseIconSource = '/static/icons/keybase-icon-256x256.png';
const KeybaseHandle = 'keybase.io/wranders';

export default function ContactItemKeybase(): React.ReactElement {
  return (
    <ContactItem
      avatar={<Avatar alt="Keybase Icon" src={KeybaseIconSource} />}
      menu={MenuKeybase}
      primaryText="Keybase"
      secondaryText={KeybaseHandle}
    />
  );
}

function MenuKeybase({
  anchorEl,
  onClose,
  open,
}: MenuProps): React.ReactElement {
  return (
    <Menu keepMounted anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItemLink
        newTab
        href={'https://' + KeybaseHandle}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        View on Keybase
      </MenuItemLink>
      <MenuItemLink
        newTab
        href={'https://' + KeybaseHandle + '/chat'}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Open chat
      </MenuItemLink>
    </Menu>
  );
}
