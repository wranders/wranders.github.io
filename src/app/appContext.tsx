import { ThemeOptions } from '@mui/material';
import React from 'react';
import Theme from '$app/theme';
import { TitleProvider } from '$components/title';
import SnackbarProvider from '$components/snackbar';

interface AppContextProps {
  appTheme: ThemeOptions;
  children?: React.ReactNode | Array<React.ReactNode>;
  siteName: string;
}

export default function AppContext({
  appTheme,
  children,
  siteName,
}: AppContextProps): React.ReactElement {
  return (
    <Theme appTheme={appTheme} darkModeKey="themeDarkMode">
      <TitleProvider title={siteName}>
        <SnackbarProvider
          anchorOrgin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {children}
        </SnackbarProvider>
      </TitleProvider>
    </Theme>
  );
}
