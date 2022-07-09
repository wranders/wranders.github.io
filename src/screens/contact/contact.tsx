import Title from '$components/title';
import { Container, Divider, List, styled, Typography } from '@mui/material';
import React from 'react';
import ContactItemDiscord from './contactItemDiscord';
import ContactItemEmail from './contactItemEmail';
import ContactItemKeybase from './contactItemKeybase';
import ContactItemPGP from './contactItemPGP';

export default function Contact(): React.ReactElement {
  const ContactList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  }));

  return (
    <main>
      <Title pageName="Contact" />
      <Container disableGutters fixed maxWidth="sm">
        <Typography component="h1" variant="h2">
          Contact
        </Typography>
        <Divider sx={{ marginTop: '1em' }} />
        <ContactList>
          <ContactItemEmail />
          <Divider />
          <ContactItemPGP />
          <Divider />
          <ContactItemKeybase />
          <Divider />
          <ContactItemDiscord />
          <Divider />
        </ContactList>
      </Container>
    </main>
  );
}
