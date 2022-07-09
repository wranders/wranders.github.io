import { ArrowDownward } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Icon,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import { ImageBackground, ImageLogo } from '.';

export default function TitleCard(): React.ReactElement {
  const TitleCardSection = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: `calc(100vh - ${theme.mixins.denseToolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      minHeight: 500,
      maxHeight: 1300,
    },
  }));

  const TitleCardContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }));

  const TitleCardBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.75,
    zIndex: -1,
  }));

  const TitleCardBackground = styled('div')(({ theme }) => ({
    backgroundImage: `url(${ImageBackground})`,
    backgroundColor: theme.palette.common.black,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -2,
  }));

  const TitleCardAvatar = styled(Avatar)(({ theme }) => ({
    color: '#fff',
    fontSize: theme.spacing(5),
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(10),
    height: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      fontSize: theme.spacing(10),
    },
  }));

  const TitleCardPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
  }));

  const TitleCardSubtext = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  }));

  const TitleCardArrowDown = styled(Icon)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(4),
    '&:hover': {
      cursor: 'pointer',
    },
  }));

  return (
    <TitleCardSection>
      <TitleCardContainer>
        <img
          style={{ display: 'none' }}
          src={ImageBackground}
          width="304"
          height="304"
          alt="increase priority"
        />
        <TitleCardAvatar src={ImageLogo} alt="DoUbleU Logo" />
        <TitleCardPaper>
          <TitleCardSubtext variant="h5">
            Code. Tunes. Scheananigans.
          </TitleCardSubtext>
        </TitleCardPaper>
        <TitleCardBackdrop />
        <TitleCardBackground />
        <TitleCardArrowDown
          onClick={() => {
            const anchor = document.querySelector('#content');
            anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          <ArrowDownward />
        </TitleCardArrowDown>
      </TitleCardContainer>
    </TitleCardSection>
  );
}
