import Title from '$components/title';
import { NewReleases } from '@mui/icons-material';
import { Divider, Grid, Icon, Paper, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import TitleCard from './titleCard';

export default function Home(): React.ReactElement {
  const HomeSection = styled('section')(({ theme }) => ({
    display: 'flex',
    overflow: 'hidden',
    minHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight}px)`,
  }));

  const HomeSectionContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  }));

  const HomeSectionPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
    maxWidth: 400,
    height: 'fit-content',
  }));

  return (
    <main>
      <Title pageName="Welcome" />
      <TitleCard />
      <HomeSection id="content">
        <HomeSectionContainer>
          <HomeSectionPaper>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Icon>
                  <NewReleases />
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
          </HomeSectionPaper>
        </HomeSectionContainer>
      </HomeSection>
    </main>
  );
}
