import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React from 'react';

const imgBG = '/static/image/circuit-board.svg';
const imgLogo = '/static/image/logo.webp';

export default function TitleCard(): React.ReactElement {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
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
        },
      },
      container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          fontSize: theme.spacing(10),
        },
      },
      subtext: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
      },
      backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.75,
        zIndex: -1,
      },
      background: {
        backgroundImage: `url(${imgBG})`,
        backgroundColor: theme.palette.common.black,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -2,
      },
      arrowDown: {
        position: 'absolute',
        bottom: theme.spacing(4),
      },
      paper: {
        margin: `${theme.spacing(1)}px auto`,
        paddingLeft: `${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(2)}px`,
      },
    }),
  )();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          style={{ display: 'none' }}
          src={imgBG}
          width="304"
          height="304"
          alt="increase priority"
        />
        <Avatar className={classes.logo} src={imgLogo} alt="DoUbleU Logo" />
        <Paper className={classes.paper}>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.subtext}
          >
            Code. Tunes. Scheananigans.
          </Typography>
        </Paper>
        <div className={classes.backdrop} />
        <div className={classes.background} />
        <Icon className={classes.arrowDown}>
          <ArrowDownwardIcon />
        </Icon>
      </Container>
    </section>
  );
}
