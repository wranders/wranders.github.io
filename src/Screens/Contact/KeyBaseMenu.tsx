import { ContactItemMenuProps } from '@Components/ContactItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { info } from './Contact';

export default function KeyBaseMenu({
  anchorEl,
  open,
  onClose,
}: ContactItemMenuProps): React.ReactElement {
  return (
    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={onClose}>
      <MenuItem
        component="a"
        href={'https://' + info.keybase.handle}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        View on Keybase
      </MenuItem>
      <MenuItem
        component="a"
        href={'https://' + info.keybase.handle + '/chat'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (onClose) onClose({}, 'backdropClick');
        }}
      >
        Open Chat
      </MenuItem>
    </Menu>
  );
}
