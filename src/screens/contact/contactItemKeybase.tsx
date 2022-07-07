import { Avatar, Menu, MenuProps } from '@material-ui/core';
import React from 'react';

import ContactItem from './contactItem';
import MenuItemLink from './menuItemLink';

const iconSource = '/static/icons/keybase-icon-256x256.png';
const handle = 'keybase.io/wranders';

export default function ContactItemKeybase(): React.ReactElement {
  return (
    <ContactItem
      avatar={<Avatar alt="Keybase Icon" src={iconSource} />}
      menu={MenuKeybase}
      primaryText="Keybase"
      secondaryText={handle}
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
        href={'https://' + handle}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        View on Keybase
      </MenuItemLink>
      <MenuItemLink
        href={'https://' + handle + '/chat'}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Open Chat
      </MenuItemLink>
    </Menu>
  );
}
