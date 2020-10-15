import Title from '@Components/Title';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import React from 'react';
import TitleCard from './TitleCard';

export default function Home(): React.ReactElement {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      content: {
        display: 'flex',
        overflow: 'hidden',
      },
      contentContainer: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
      },
      paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
    }),
  )();

  return (
    <main>
      <Title pageName="Welcome" />
      <TitleCard />
      <section className={classes.content}>
        <Container className={classes.contentContainer}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Icon>
                  <NewReleasesIcon />
                </Icon>
              </Grid>
              <Grid item xs>
                <Typography variant="h5">WIP</Typography>
                <Divider />
                <Typography>
                  This site serves the dual purpose of a personal page and web
                  development practice. Because of the later, it&apos;s
                  constantly evolving.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </section>
    </main>
  );
}
