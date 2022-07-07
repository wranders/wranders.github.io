import { MenuItem } from '@material-ui/core';
import React from 'react';

export interface MenuItemLinkProps {
  children?: React.ReactNode | Array<React.ReactNode>;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function MenuItemLink({
  children,
  href,
  onClick,
}: MenuItemLinkProps): React.ReactElement {
  return (
    <MenuItem component="a" href={href} onClick={onClick}>
      {children}
    </MenuItem>
  );
}
