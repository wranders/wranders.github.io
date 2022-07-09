import {
  Avatar,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { DrawerWidth } from '.';
import NavigationDrawerContext, {
  NavigationDrawerContextType,
} from './navigationDrawerContext';

export interface NavigationDrawerHeader {
  href: string;
  icon: React.ReactElement<typeof Avatar>;
  title: string;
}

export interface NavigationDrawerLink
  extends Omit<NavigationDrawerHeader, 'title'> {
  label: string;
}

export interface NavigationDrawerCopyright {
  start: string;
  end: string;
  entity: string;
  entitiyLink?: string;
}

interface NavigationDrawerProps {
  copyright?: NavigationDrawerCopyright;
  externalLinks?: Array<NavigationDrawerLink>;
  header?: NavigationDrawerHeader;
  internalLinks?: Array<NavigationDrawerLink>;
}

export default function NavigationDrawer({
  copyright,
  externalLinks,
  header,
  internalLinks,
}: NavigationDrawerProps): React.ReactElement {
  const OffsetAppBar = styled('div')(({ theme }) => theme.mixins.denseToolbar);

  const HeaderListItem = styled(ListItemButton)<ListItemButtonProps>(
    ({ theme }) => ({
      ...theme.mixins.denseToolbar,
      '&.Mui-selected': {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    }),
  ) as typeof ListItemButton;

  const HeadLink = React.useMemo(() => {
    if (typeof header === 'undefined') return 'a';
    return React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
      (props, ref) => {
        return <RouterLink to={header.href} ref={ref} {...props} />;
      },
    );
  }, [header?.href]);

  function renderHeaderIcon(): React.ReactElement | null {
    if (typeof header === 'undefined' || typeof header.icon === 'undefined')
      return null;
    return <ListItemIcon>{header.icon}</ListItemIcon>;
  }

  function renderHeader(): React.ReactElement | null {
    if (typeof header === 'undefined') return null;
    return (
      <HeaderListItem dense selected key={header.title} component={HeadLink}>
        {renderHeaderIcon()}
        <ListItemText
          primary={<Typography variant="h5">{header.title}</Typography>}
        />
      </HeaderListItem>
    );
  }

  function createLinkList(
    links: Array<NavigationDrawerLink>,
    external?: boolean,
  ): React.ReactElement {
    return (
      <List>
        {links.map((l) => (
          <ListItemButton
            key={l.label}
            component={external ? 'a' : RouterLink}
            to={external ? undefined : l.href}
            href={external ? l.href : undefined}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {l.icon ? <ListItemIcon>{l.icon}</ListItemIcon> : null}
            <ListItemText primary={l.label} />
          </ListItemButton>
        ))}
      </List>
    );
  }

  function renderInternalLinks(): React.ReactElement | null {
    if (typeof internalLinks === 'undefined') return null;
    return (
      <div>
        <Divider />
        {createLinkList(internalLinks)}
      </div>
    );
  }

  function renderCopyright(): React.ReactElement | null {
    if (typeof copyright === 'undefined') return null;
    return (
      <div>
        <Divider />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            textAlign: 'center',
            marginTop: '1em',
            width: DrawerWidth,
          }}
        >
          <b>
            Copyright &copy; {copyright.start}-{copyright.end}
          </b>
          &nbsp;
          {renderCopyrightEntity(copyright.entity, copyright.entitiyLink)}
        </Typography>
      </div>
    );
  }

  function renderCopyrightEntity(
    entity: string,
    link?: string,
  ): React.ReactElement {
    return link ? (
      <Link
        color="inherit"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        {entity}
      </Link>
    ) : (
      <Typography variant="inherit">{entity}</Typography>
    );
  }

  function renderExternalLinks(): React.ReactElement | null {
    return !externalLinks ? null : (
      <div>
        <Divider />
        <Typography
          sx={{
            marginTop: '1em',
            textAlign: 'center',
            pointerEvents: 'none',
            cursor: 'default',
          }}
        >
          External Links
        </Typography>
        {createLinkList(externalLinks, true)}
      </div>
    );
  }

  return (
    <NavigationDrawerContext.Consumer>
      {(navDrawerCtx: NavigationDrawerContextType | null) =>
        navDrawerCtx && (
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={navDrawerCtx.open}
            onClose={navDrawerCtx.toggle}
            onOpen={navDrawerCtx.toggle}
          >
            <div
              role="presentation"
              onClick={navDrawerCtx.toggle}
              style={{
                width: DrawerWidth,
              }}
            >
              <OffsetAppBar>{renderHeader()}</OffsetAppBar>
              {renderInternalLinks()}
              {renderExternalLinks()}
              {renderCopyright()}
            </div>
          </SwipeableDrawer>
        )
      }
    </NavigationDrawerContext.Consumer>
  );
}
