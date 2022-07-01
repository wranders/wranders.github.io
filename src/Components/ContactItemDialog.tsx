import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { ContactItemMenuProps, ContactItemProps } from './ContactItem';

export interface ContactItemDialogMenuProps extends ContactItemMenuProps {
  dialogTitleFunc(title: string): void;
  dialogContentFunc(content: string): void;
  dialogActionFunc(
    actions: React.ReactElement | Array<React.ReactElement>,
  ): void;
  dialogCloseFunc(): void;
  dialogOpenFunc(): void;
}

export interface ContactItemDialogProps
  extends Omit<ContactItemProps, 'menu'>,
    ContactItemDialogMenuProps {
  menu: React.ElementType<ContactItemDialogMenuProps>;
}

export default function ContactItemDialog({
  avatar,
  primaryText,
  secondaryText,
  menu,
  snackbarFunc,
  dialogTitleFunc,
  dialogContentFunc,
  dialogActionFunc,
  dialogCloseFunc,
  dialogOpenFunc,
}: Omit<ContactItemDialogProps, 'open'>): React.ReactElement {
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
          <MoreVertIcon />
        </IconButton>
        <ItemMenu
          anchorEl={anchorElement}
          open={open}
          onClose={handleMenuClose}
          snackbarFunc={snackbarFunc}
          dialogTitleFunc={dialogTitleFunc}
          dialogContentFunc={dialogContentFunc}
          dialogActionFunc={dialogActionFunc}
          dialogCloseFunc={dialogCloseFunc}
          dialogOpenFunc={dialogOpenFunc}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
