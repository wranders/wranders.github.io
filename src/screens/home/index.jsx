import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Paper, Grid, Icon, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import NewReleasesIcon from '@material-ui/icons/NewReleases';

import Title from '../../components/title';

import TitleCard from './titleCard';

const style = theme => ({
  content: {
    display: 'flex',
    overflow: 'hidden'
  },
  contentContainer: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative'
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <main>
        <Title render='Welcome'/>
        <TitleCard/>
        <section className={classes.content}>
          <Container className={classes.contentContainer}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={2}>
                <Grid item><Icon><NewReleasesIcon/></Icon></Grid>
                <Grid item xs>
                  <Typography variant='h5'>
                    Continuous WIP
                  </Typography>
                  <Divider/>
                  <Typography>
                    In addition to being a personal page, this site is
                    used for web development practice and experimentation,
                    so it&apos;s constantly evolving.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object
}

export default withStyles(style, { withTheme: true })(Home);