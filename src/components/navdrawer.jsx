import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 250;

const style = theme => ({
  appBarOffset: theme.mixins.denseToolbar,
  copyright: {
    position: 'absolute',
    textAlign: 'center',
    width: drawerWidth,
    marginTop: '1em'
  },
  drawer: {
    width: drawerWidth
  },
  drawerLabel: {
    marginTop: '1em',
    textAlign: 'center',
    pointerEvents: 'none',
    cursor: 'default'
  },
  headLink: {
    '&.Mui-selected': {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      }
    }
  }
});

const NavDrawerContext = React.createContext({
  open: false,
  toggle: () => {}
});

class NavDrawer extends React.Component {
  constructor() {
    super();
    this.createLinkList = this.createLinkList.bind(this);
  }

  createLinkList(links, external) {
    const isInternal = (typeof external === 'undefined') || !external
    return (
      <List>
        {links.map(l => (
          <ListItem
            button
            key={l.label}
            component={(isInternal ? RouterLink : 'a')}
            to={(isInternal ? l.path : undefined)}
            href={(isInternal ? undefined : l.path)}
            target={(isInternal ? undefined : '_blank')}
            rel={(isInternal ? undefined : 'noopener noreferrer')}
          >
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.label}/>
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    const { classes, headLink, internalLinks, externalLinks, copyright } = this.props;
    const undef = 'undefined';
    return(
      <NavDrawerContext.Consumer>
        {({ open, toggle }) => (
          <SwipeableDrawer
            variant='temporary'
            anchor='left'
            open={open}
            onClose={toggle}
            onOpen={toggle}
          >
            <div className={classes.drawer} role='presentation' onClick={toggle}>
              <div className={classes.appBarOffset}>
                {typeof headLink !== undef ? (
                  <ListItem
                    dense
                    button
                    selected
                    classes={{ root: classes.headLink }}
                    key={headLink.title}
                    component={
                      (typeof headLink.ref !== undef ? RouterLink : undefined)
                    }
                    to={
                      (typeof headLink.ref !== undef ? headLink.ref : undefined)
                    }
                  >
                    {typeof headLink.icon !== undef ? (
                      <ListItemIcon>
                        {headLink.icon}
                      </ListItemIcon>
                    ) : ( <div/> )}
                    <ListItemText
                      primary={
                        <Typography variant='h5'>
                          {headLink.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                ) : ( <div/> )}
              </div>
              {typeof internalLinks !== undef ? (
                <div>
                  <Divider/>
                  {this.createLinkList(internalLinks)}
                </div>
              ) : ( <div/> )}
              {typeof externalLinks !== undef ? (
                <div>
                  <Divider/>
                  <Typography className={classes.drawerLabel}>
                    External Links
                  </Typography>
                  {this.createLinkList(externalLinks, true)}
                </div>
              ) : ( <div/> )}
              {typeof copyright !== undef ? (
                <div>
                  <Divider/>
                  <Typography variant='caption' className={classes.copyright}>
                    <b>Copyright &copy; {copyright.start}-{copyright.end}</b>&nbsp;
                    {typeof copyright.entityLink !== undef ? (
                      <Link
                        color='inherit'
                        href={copyright.entityLink}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {copyright.entity}
                      </Link>
                    ) : (
                      <Typography variant='inherit'>
                        {copyright.entity}
                      </Typography>
                    )}
                  </Typography>
                </div>
              ) : ( <div/> )}
            </div>
          </SwipeableDrawer>
        )}
      </NavDrawerContext.Consumer>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object,
  headLink: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    ref: PropTypes.string
  }),
  internalLinks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  })),
  externalLinks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  })),
  copyright: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
    entityLink: PropTypes.string
  })
}

export default withStyles(style)(NavDrawer);
export { NavDrawerContext };