import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';
import Title from '../../components/title';

const ErrNotFound = ({ location }) =>
  <main>
    <Container disableGutters fixed>
      <Title render='Oops'/>
      <Typography variant='h2' component='h1'>404</Typography>
      <Typography>
        <code>{ location.pathname }</code> not found.
      </Typography>
    </Container>
  </main>;

ErrNotFound.propTypes = {
  location: PropTypes.object
}

export default ErrNotFound;