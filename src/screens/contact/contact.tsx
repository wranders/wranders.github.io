import { Container, Divider, List, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import Title from '@components/title';
import ContactItemDiscord from './contactItemDiscord';
import ContactItemKeybase from './contactItemKeybase';
import ContactItemEmail from './contactItemEmail';
import ContactItemPGP from './contactItemPGP';

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

  return (
    <main>
      <Title pageName="Contact" />
      <Container disableGutters fixed>
        <Typography component="h1" variant="h2">
          Contact
        </Typography>
        <Divider className={classes.spacedDivider} />
        <List className={classes.contactList}>
          <ContactItemEmail className={classes.green} />
          <Divider />
          <ContactItemPGP className={classes.green} />
          <Divider />
          <ContactItemKeybase />
          <Divider />
          <ContactItemDiscord />
        </List>
      </Container>
    </main>
  );
}
