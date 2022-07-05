import { ContactItemMenuProps } from '@Components/ContactItem';
import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { info } from './Contact';

export default function EmailMenu({
  anchorEl,
  open,
  snackbarFunc,
  onClose,
}: ContactItemMenuProps): React.ReactElement {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={() => {
        if (onClose) onClose({}, 'backdropClick');
      }}
    >
      <MenuItem
        onClick={() => {
          navigator.clipboard.writeText(info.email.addr);
          if (snackbarFunc) snackbarFunc('Email Address Copied to Clipboard');
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Copy Address
      </MenuItem>
      <MenuItem
        component="a"
        href={'mailto:' + info.email.addr}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Mail To
      </MenuItem>
    </Menu>
  );
}
