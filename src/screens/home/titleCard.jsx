import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const backgroundImage = '/static/image/si.jpg';
const logoImage = '/static/image/logo.png';

const style = theme => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: `calc(100vh - ${theme.mixins.denseToolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1300,
    }
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: theme.palette.common.black,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    background: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -2
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  logo: {
    color: '#fff',
    fontSize: theme.spacing(5),
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(10),
    height: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      fontSize: theme.spacing(10)
    }
  },
  subtext: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  arrowDown: {
    position: 'absolute',
    bottom: theme.spacing(4)
  }
});

class TitleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <Container className={classes.container}>
          <img style={{ display: 'none' }} src={backgroundImage} alt='increase priority'/>
          <Avatar className={classes.logo} src={logoImage} alt='DoUbleU Logo'/>
          <Typography color='inherit' align='center' variant='h5' className={classes.subtext}>
            Code. Games. Scheananigans.
          </Typography>
          <div className={classes.backdrop} />
          <div className={classes.background} />
          <Icon className={classes.arrowDown}>
            <ArrowDownwardIcon/>
          </Icon>
        </Container>
      </section>
    );
  }
}

TitleCard.propTypes = {
  classes: PropTypes.object
}

export default withStyles(style)(TitleCard);