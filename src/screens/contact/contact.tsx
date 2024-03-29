import Title from '$components/title';
import { Container, Divider, List, styled, Typography } from '@mui/material';
import React from 'react';
import ContactItemDiscord from './contactItemDiscord';
import ContactItemEmail from './contactItemEmail';
import ContactItemPGP from './contactItemPGP';
import ContactItemSession from './contactItemSession';

export default function Contact(): React.ReactElement {
  const ContactList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <main>
      <Title pageName="Contact" />
      <Container disableGutters fixed maxWidth="md">
        <Typography component="h1" variant="h2">
          Contact
        </Typography>
        <Divider sx={{ marginTop: '1em' }} />
        <ContactList>
          <ContactItemEmail />
          <Divider />
          <ContactItemPGP />
          <Divider />
          <ContactItemSession />
          <Divider />
          <ContactItemDiscord />
          <Divider />
        </ContactList>
      </Container>
    </main>
  );
}
