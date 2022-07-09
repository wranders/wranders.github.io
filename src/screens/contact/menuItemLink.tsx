import { MenuItem } from '@mui/material';
import React from 'react';

interface MenuItemLinkProps {
  children?: React.ReactNode | Array<React.ReactNode>;
  href: string;
  newTab?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function MenuItemLink({
  children,
  href,
  newTab,
  onClick,
}: MenuItemLinkProps): React.ReactElement {
  return (
    <MenuItem
      component="a"
      href={href}
      onClick={onClick}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </MenuItem>
  );
}
