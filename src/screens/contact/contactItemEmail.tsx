import React from 'react';
import { Avatar, Menu, MenuItem, MenuProps } from '@material-ui/core';

import ContactItem from './contactItem';
import { Email } from '@material-ui/icons';
import { SnackbarContext } from '@components/snackbar';
import MenuItemLink from './menuItemLink';

const emailAddress = 'w@doubleu.codes';

export interface ContactItemEmailProps {
  className?: string;
}

export default function ContactItemEmail({
  className,
}: ContactItemEmailProps): React.ReactElement {
  return (
    <ContactItem
      avatar={
        <Avatar alt="Email Icon" className={className}>
          <Email />
        </Avatar>
      }
      menu={MenuEmail}
      primaryText="Email"
      secondaryText={emailAddress}
    />
  );
}

function MenuEmail({ anchorEl, onClose, open }: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);

  function copyAddress(): void {
    navigator.clipboard.writeText(emailAddress);
    if (snackbarCtx)
      snackbarCtx.pushMessage('Email Address Copied to Clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={onClose}>
      <MenuItem onClick={copyAddress}>Copy Address</MenuItem>
      <MenuItemLink
        href={'mailto:' + emailAddress}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Mail To
      </MenuItemLink>
    </Menu>
  );
}
