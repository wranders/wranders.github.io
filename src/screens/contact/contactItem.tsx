import { MoreVert } from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuProps,
} from '@mui/material';
import React from 'react';

interface ContactItemProps extends MenuProps {
  avatar: React.ReactElement;
  primaryText: string;
  secondaryText: string;
  menu: React.ElementType<MenuProps>;
  style?: React.CSSProperties;
}

export default function ContactItem({
  avatar,
  primaryText,
  secondaryText,
  menu,
  style,
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
      <ListItemText
        primary={primaryText}
        secondary={secondaryText}
        style={style}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <ItemMenu
          anchorEl={anchorElement}
          open={open}
          onClose={handleMenuClose}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
