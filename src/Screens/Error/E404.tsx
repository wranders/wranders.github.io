import Title from '@Components/Title';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function E404(): React.ReactElement {
  const location = useLocation();
  return (
    <main>
      <Title pageName="Oops (404)" />
      <Container disableGutters fixed>
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
