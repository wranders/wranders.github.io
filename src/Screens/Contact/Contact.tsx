import ContactItem from '@Components/ContactItem';
import Title from '@Components/Title';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import DiscordMenu from './DiscordMenu';
import EmailMenu from './EmailMenu';
import KeyBaseMenu from './KeyBaseMenu';
import PGPMenu from './PGPMenu';

export const info = {
  discord: {
    icon: '/static/icons/discord-icon-245x240.png',
    handle: 'doUbleU#2047',
  },
  email: {
    addr: 'w@doubleu.codes',
  },
  keybase: {
    icon: '/static/icons/keybase-icon-256x256.png',
    handle: 'keybase.io/wranders',
  },
  pgp: {
    file: '/pgp_pubkey.asc',
    fingerprint: 'BFD9 DFF2 3686 CB17 B2CF 7E1A 5F5D 48D0 D507 7519',
  },
};

type SnackbarEntry = {
  message: string;
  key: number;
};

export default function Contact(): React.ReactElement {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      spacedDivider: {
        marginTop: '1em',
        marginBottom: '1em',
      },
      contactList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      green: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
      },
      snackbarClose: {
        padding: theme.spacing(0.5),
      },
    }),
  )();
  const snackbarRef = React.useState<Array<SnackbarEntry>>([])[0];
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [snackbarInfo, setSnackbarInfo] = React.useState<
    SnackbarEntry | undefined
  >(undefined);

  function processSnackbarQueue(): void {
    if (snackbarRef.length > 0) {
      setSnackbarInfo(snackbarRef.shift());
      setSnackbarOpen(true);
    }
  }

  function handleSnackbarOpen(message: string): void {
    snackbarRef.push({
      message,
      key: new Date().getTime(),
    });
    if (snackbarOpen) {
      setSnackbarOpen(false);
    } else {
      processSnackbarQueue();
    }
  }

  return (
    <main>
      <Title pageName="Contact" />
      <Container disableGutters fixed>
        <Typography component="h1" variant="h2">
          Contact
        </Typography>
        <Divider className={classes.spacedDivider} />
        <List className={classes.contactList}>
          <ContactItem
            avatar={
              <Avatar alt="Email" className={classes.green}>
                <EmailIcon />
              </Avatar>
            }
            primaryText="Email"
            secondaryText={info.email.addr}
            menu={EmailMenu}
            snackbarFunc={handleSnackbarOpen}
          />
          <Divider />
          <ContactItem
            avatar={
              <Avatar alt="PGP" className={classes.green}>
                <VpnKeyIcon />
              </Avatar>
            }
            primaryText="PGP"
            secondaryText={info.pgp.fingerprint}
            menu={PGPMenu}
            snackbarFunc={handleSnackbarOpen}
          />
          <Divider />
          <ContactItem
            avatar={<Avatar alt="Keybase" src={info.keybase.icon} />}
            primaryText="Keybase"
            secondaryText={info.keybase.handle}
            menu={KeyBaseMenu}
          />
          <Divider />
          <ContactItem
            avatar={<Avatar alt="Discord" src={info.discord.icon} />}
            primaryText="Discord"
            secondaryText={info.discord.handle}
            menu={DiscordMenu}
            snackbarFunc={handleSnackbarOpen}
          />
        </List>
      </Container>
      <Snackbar
        key={snackbarInfo ? snackbarInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          setSnackbarOpen(false);
        }}
        onExited={() => processSnackbarQueue()}
        message={snackbarInfo ? snackbarInfo.message : undefined}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.snackbarClose}
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </main>
  );
}
