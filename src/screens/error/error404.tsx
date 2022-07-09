import Title from '$components/title';
import { Container, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Error404(): React.ReactElement {
  const location = useLocation();

  return (
    <main>
      <Title pageName="Oops (404)" />
      <Container disableGutters fixed maxWidth="sm">
        <Typography variant="h2" component="h1">
          404
        </Typography>
        <Typography>
          <code>{location.pathname}</code> not found.
        </Typography>
      </Container>
    </main>
  );
}
