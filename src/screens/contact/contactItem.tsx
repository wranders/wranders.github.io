import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuProps,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';

export interface ContactItemMenuProps extends MenuProps {
  snackbarFunc?(message: string): void;
}

export interface ContactItemProps extends ContactItemMenuProps {
  avatar: React.ReactElement;
  primaryText: string;
  secondaryText: string;
  menu: React.ElementType<ContactItemMenuProps>;
}

export default function ContactItem({
  avatar,
  primaryText,
  secondaryText,
  menu,
  snackbarFunc,
}: Omit<ContactItemProps, 'open'>): React.ReactElement {
  const [anchorElement, setAnchorElement] = React.useState<Element | null>(
    null,
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const ItemMenu = React.useMemo(() => menu, [menu]);

  function handleMenuOpen(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    setAnchorElement(event.currentTarget);
    setOpen(true);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
    setOpen(false);
  }

  return (
    <ListItem>
      <ListItemAvatar>{avatar}</ListItemAvatar>
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <ItemMenu
          anchorEl={anchorElement}
          open={open}
          onClose={handleMenuClose}
          snackbarFunc={snackbarFunc}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
