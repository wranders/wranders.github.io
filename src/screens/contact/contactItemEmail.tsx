import { SnackbarContext } from '$components/snackbar';
import { Email } from '@mui/icons-material';
import { Avatar, Menu, MenuItem, MenuProps, styled } from '@mui/material';
import React from 'react';
import ContactItem from './contactItem';
import MenuItemLink from './menuItemLink';

const ContactItemEmailAddress = 'w@doubleu.codes';

export default function ContactItemEmail(): React.ReactElement {
  const EmailAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <ContactItem
      avatar={
        <EmailAvatar alt="Email Icon">
          <Email />
        </EmailAvatar>
      }
      menu={MenuEmail}
      primaryText="Email"
      secondaryText={ContactItemEmailAddress}
    />
  );
}

function MenuEmail({ anchorEl, onClose, open }: MenuProps): React.ReactElement {
  const snackbarCtx = React.useContext(SnackbarContext);

  function handleCopyAddress(): void {
    navigator.clipboard.writeText(ContactItemEmailAddress);
    if (snackbarCtx !== null)
      snackbarCtx.pushMessage('Email address copied to clipboard');
    if (onClose) onClose({}, 'backdropClick');
  }

  return (
    <Menu keepMounted anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={handleCopyAddress}>Copy Address</MenuItem>
      <MenuItemLink
        href={'mailto:' + ContactItemEmailAddress}
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Mail To
      </MenuItemLink>
    </Menu>
  );
}
