import { PaletteType } from '@material-ui/core';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
} from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import ThemeContext from './ThemeContext';

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    denseToolbar: CSSProperties;
  }

  interface MixinsOptions {
    denseToolbar?: CSSProperties;
  }
}

type ThemeProps = {
  appTheme: ThemeOptions;
  children?: React.ReactNode | Array<React.ReactNode>;
  darkModeKey?: string;
};

export default function Theme({
  children,
  darkModeKey,
  appTheme,
}: ThemeProps): React.ReactElement {
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)');
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<ThemeOptions>(appTheme);
  const [useDark, setUseDark] = React.useState<boolean>(false);

  function SetPaletteType(isDark: boolean): void {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: isDark ? ('dark' as PaletteType) : ('light' as PaletteType),
      },
    };
    setTheme(updatedTheme);
    setUseDark(isDark);
    if (darkModeKey) localStorage.setItem(darkModeKey, JSON.stringify(isDark));
  }

  function TogglePaletteType() {
    const { type } = theme.palette as PaletteOptions;
    const isDark = type === 'light';
    SetPaletteType(isDark);
  }

  React.useEffect(() => {
    let lsDark: string | null = null;
    if (typeof darkModeKey !== 'undefined') {
      lsDark = localStorage.getItem(darkModeKey);
    }
    if (lsDark === null) {
      setUseDark(mediaQuery);
      SetPaletteType(mediaQuery);
      setMounted(true);
    } else {
      const lsVal = lsDark === 'true';
      setUseDark(lsVal);
      SetPaletteType(lsVal);
      setMounted(true);
    }
  }, [mounted]);

  const compiledTheme = createTheme(theme);

  if (!mounted) return <div />;

  return (
    <ThemeContext.Provider
      value={{
        useDark: useDark,
        theme: theme,
        toggle: TogglePaletteType,
      }}
    >
      <ThemeProvider theme={compiledTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
