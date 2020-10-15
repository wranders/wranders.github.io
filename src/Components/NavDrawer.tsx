import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NavDrawerContext, NavDrawerContextConsumer } from './NavDrawerContext';

export type NavDrawerHeaderLink = {
  title: string;
  icon?: React.ReactElement;
  href?: string;
};

export type LinkListItem = {
  label: string;
  icon?: React.ReactElement;
  href: string;
};

export type Copyright = {
  start: string;
  end: string;
  entity: string;
  entityLink?: string;
};

export type NavDrawerProps = {
  copyright?: Copyright;
  externalLinks?: Array<LinkListItem>;
  header?: NavDrawerHeaderLink;
  internalLinks?: Array<LinkListItem>;
};

export default function NavDrawer({
  copyright,
  externalLinks,
  header,
  internalLinks,
}: NavDrawerProps): React.ReactElement {
  const drawerWidth = 250;
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      appBarOffset: theme.mixins.denseToolbar,
      copyright: {
        position: 'absolute',
        textAlign: 'center',
        width: drawerWidth,
        marginTop: '1em',
      },
      drawer: {
        width: drawerWidth,
      },
      drawerLabel: {
        marginTop: '1em',
        textAlign: 'center',
        pointerEvents: 'none',
        cursor: 'default',
      },
      headLink: {
        '&.Mui-selected': {
          color: theme.palette.getContrastText(theme.palette.primary.main),
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    }),
  )();
  const HeadLink = React.useMemo(
    () =>
      React.forwardRef((
        linkProps,
        ref /* eslint-disable-line @typescript-eslint/no-unused-vars */,
      ) => (
        <RouterLink
          to={(header as NavDrawerHeaderLink).href as string}
          {...linkProps}
        />
      )),
    [(header as NavDrawerHeaderLink).href],
  );

  function CreateLinkList(
    links: Array<LinkListItem>,
    external?: boolean,
  ): React.ReactElement {
    const isInternal = typeof external === 'undefined' || !external;

    return (
      <List>
        {links.map((l) => (
          <ListItem
            button
            key={l.label}
            component={isInternal ? RouterLink : 'a'}
            to={isInternal ? l.href : undefined}
            href={isInternal ? undefined : l.href}
            target={isInternal ? undefined : '_blank'}
            rel={isInternal ? undefined : 'noopener noreferrer'}
          >
            {l.icon ? <ListItemIcon>{l.icon}</ListItemIcon> : null}
            <ListItemText primary={l.label} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <NavDrawerContextConsumer>
      {(navDrawerContext: NavDrawerContext | null) =>
        navDrawerContext && (
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={navDrawerContext.open}
            onClose={navDrawerContext.toggle}
            onOpen={navDrawerContext.toggle}
          >
            <div
              className={classes.drawer}
              role="presentation"
              onClick={navDrawerContext.toggle}
            >
              <div className={classes.appBarOffset}>
                {header ? (
                  <ListItem
                    dense
                    button
                    selected
                    classes={{ root: classes.headLink }}
                    key={header.title}
                    component={HeadLink}
                  >
                    {header.icon ? (
                      <ListItemIcon>{header.icon}</ListItemIcon>
                    ) : null}
                    <ListItemText
                      primary={
                        <Typography variant="h5">{header.title}</Typography>
                      }
                    />
                  </ListItem>
                ) : null}
              </div>
              {internalLinks ? (
                <div>
                  <Divider />
                  {CreateLinkList(internalLinks)}
                </div>
              ) : null}
              {externalLinks ? (
                <div>
                  <Divider />
                  <Typography className={classes.drawerLabel}>
                    External Links
                  </Typography>
                  {CreateLinkList(externalLinks, true)}
                </div>
              ) : null}
              {copyright ? (
                <div>
                  <Divider />
                  <Typography variant="caption" className={classes.copyright}>
                    <b>
                      Copyright &copy; {copyright.start}-{copyright.end}
                    </b>
                    &nbsp;
                    {copyright.entityLink ? (
                      <Link
                        color="inherit"
                        href={copyright.entityLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {copyright.entity}
                      </Link>
                    ) : (
                      <Typography variant="inherit">
                        {copyright.entity}
                      </Typography>
                    )}
                  </Typography>
                </div>
              ) : null}
            </div>
          </SwipeableDrawer>
        )
      }
    </NavDrawerContextConsumer>
  );
}
