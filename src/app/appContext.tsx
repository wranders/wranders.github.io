import { TitleProvider } from '@components/title';
import { ThemeOptions } from '@material-ui/core';
import React from 'react';

import Snackbar from '@components/snackbar';
import Theme from './theme';

interface AppContextProps {
  appTheme: ThemeOptions;
  children: React.ReactNode | Array<React.ReactNode>;
  siteName: string;
}

export default function AppContext({
  appTheme,
  children,
  siteName,
}: AppContextProps): React.ReactElement {
  return (
    <Theme appTheme={appTheme} darkModeKey="themeDarkMode">
      <TitleProvider siteName={siteName}>
        <Snackbar>{children}</Snackbar>
      </TitleProvider>
    </Theme>
  );
}
