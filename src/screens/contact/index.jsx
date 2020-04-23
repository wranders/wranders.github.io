import React from 'react';
import PropTypes from 'prop-types';

// :: Material Core :: //
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

// :: Material Icons :: //
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// :: App Components :: //
import ContactItem from '../../components/contactitem';
import Title from '../../components/title';

// :: Screen Components :: //
import DiscordMenu from './discordmenu';
import EmailMenu from './emailmenu';
import KeybaseMenu from './keybasemenu';
import PGPMenu from './pgpmenu';

const info = {
  discord: {
    icon: '/static/icons/discord-icon-245x240.png',
    handle: 'doUbleU#2047'
  },
  email: {
    addr: 'w@doubleu.codes'
  },
  keybase: {
    icon: '/static/icons/keybase-icon-256x256.png',
    handle: 'keybase.io/wranders'
  },
  pgp: {
    file: '/pgp_pubkey.asc',
    fingerprint: 'BFD9 DFF2 3686 CB17 B2CF 7E1A 5F5D 48D0 D507 7519'
  }
}

const style = theme => ({
  contactList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  green: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main
  },
  snackbarClose: {
    padding: theme.spacing(0.5)
  },
  keyContent: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap'
  },
  spacedDivider: {
    marginTop: '1em',
    marginBottom: '1em'
  }
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInfo: undefined,
      snackbarOpen: false,
      dialogOpen: false,
      dialogTitle: null,
      dialogContent: null,
      dialogActions: null
    }
    this.snackbarRef = [];
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleSnackbarExited = this.handleSnackbarExited.bind(this);
    this.processSnackbarQueue = this.processSnackbarQueue.bind(this);
    this.setDialogTitle = this.setDialogTitle.bind(this);
    this.setDialogContent = this.setDialogContent.bind(this);
    this.setDialogActions = this.setDialogActions.bind(this);
  }

  handleDialogClose() {
    this.setState({
      dialogOpen: false
    });
  }

  handleDialogOpen() {
    this.setState({
      dialogOpen: true
    });
  }

  handleSnackbarOpen(message) {
    this.snackbarRef.push({
      message,
      key: new Date().getTime()
    });
    if (this.state.snackbarOpen) {
      this.setState({
        snackbarOpen: false
      });
    } else {
      this.processSnackbarQueue();
    }
  }

  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackbarOpen: false
    })
  }

  handleSnackbarExited() {
    this.processSnackbarQueue();
  }

  processSnackbarQueue() {
    if (this.snackbarRef.length > 0) {
      this.setState({
        messageInfo: this.snackbarRef.shift(),
        snackbarOpen: true
      })
    }
  }

  setDialogTitle(title) {
    this.setState({
      dialogTitle: title
    });
  }

  setDialogContent(content) {
    this.setState({
      dialogContent: content
    });
  }

  setDialogActions(actions) {
    this.setState({
      dialogActions: actions
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <main>
        <Container>
          <Title render='Contact'/>
          <Typography component='h1' variant='h2'>Contact</Typography>
          <Divider className={classes.spacedDivider}/>
          <Typography>
            If you would like to get in touch, below are the ways to do that.
            I <b>do not</b> use any social media, personal or professional.
            Anything in these realms using my name or claiming to be me is false.
            If it&apos;s not listed here, it&apos;s wrong.
          </Typography>
          <Divider className={classes.spacedDivider}/>
          <List className={classes.contactList}>
            <ContactItem
              avatar={
                <Avatar alt='Email' className={this.props.classes.green}>
                  <EmailIcon/>
                </Avatar>
              }
              primaryText='Email'
              secondaryText={info.email.addr}
              menu={EmailMenu}
              snackbarFunc={this.handleSnackbarOpen}
            />
            <Divider/>
            <ContactItem
              avatar={
                <Avatar alt='PGP' className={this.props.classes.green}>
                  <VpnKeyIcon/>
                </Avatar>
              }
              primaryText='PGP'
              secondaryText={info.pgp.fingerprint}
              menu={PGPMenu}
              snackbarFunc={this.handleSnackbarOpen}
              dialogTitleFunc={this.setDialogTitle}
              dialogContentFunc={this.setDialogContent}
              dialogActionFunc={this.setDialogActions}
              dialogCloseFunc={this.handleDialogClose}
              dialogOpenFunc={this.handleDialogOpen}
            />
            <Divider/>
            <ContactItem
              avatar={
                <Avatar alt='Keybase' src={info.keybase.icon}/>
              }
              primaryText='Keybase'
              secondaryText={info.keybase.handle}
              menu={KeybaseMenu}
            />
            <Divider/>
            <ContactItem
              avatar={
                <Avatar alt='Discord' src={info.discord.icon}/>
              }
              primaryText='Discord'
              secondaryText={info.discord.handle}
              menu={DiscordMenu}
              snackbarFunc={this.handleSnackbarOpen}
            />
          </List>
        </Container>
        <Snackbar
          key={this.state.messageInfo ? this.state.messageInfo.key : undefined}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
          onExited={this.handleSnackbarExited}
          message={this.state.messageInfo ? this.state.messageInfo.message : undefined}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              className={this.props.classes.snackbarClose}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon/>
            </IconButton>
          }
        />
        <Dialog onClose={this.handleDialogClose} open={this.state.dialogOpen}>
          <DialogTitle onClose={this.handleDialogClose}>
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText className={classes.keyContent}>
              {this.state.dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.state.dialogActions}
            <Button
              variant='contained'
              color='secondary'
              onClick={this.handleDialogClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object
}

export default withStyles(style, { withTheme: true })(Contact);
export { info };