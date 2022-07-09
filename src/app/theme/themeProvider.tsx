import {
  createTheme,
  CssBaseline,
  PaletteOptions,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import ThemeContext from './themeContext';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    denseToolbar: CSSProperties;
  }

  interface MixinOptions {
    denseToolbar?: CSSProperties;
  }
}

interface ThemeProviderProps {
  appTheme: ThemeOptions;
  children?: React.ReactNode | Array<React.ReactNode>;
  darkModeKey?: string;
}

export default function ThemeProvider({
  appTheme,
  children,
  darkModeKey,
}: ThemeProviderProps): React.ReactElement {
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)');
  const [dark, setDark] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<ThemeOptions>(appTheme);

  function setPaletteType(isDark: boolean): void {
    const updatedTheme: ThemeOptions = {
      ...theme,
      palette: {
        ...theme.palette,
        mode: isDark ? 'dark' : 'light',
      },
    };
    setTheme(updatedTheme);
    setDark(isDark);
    if (darkModeKey) localStorage.setItem(darkModeKey, JSON.stringify(isDark));
  }

  function togglePaletteType() {
    const { mode } = theme.palette as PaletteOptions;
    const isDark = mode === 'light';
    setPaletteType(isDark);
  }

  React.useEffect(() => {
    let localStorageDark: string | null = null;
    if (typeof darkModeKey !== 'undefined') {
      localStorageDark = localStorage.getItem(darkModeKey);
    }
    if (localStorageDark === null) {
      setDark(mediaQuery);
      setPaletteType(mediaQuery);
      setMounted(true);
    } else {
      const localStorageValue = localStorageDark === 'true';
      setDark(localStorageValue);
      setPaletteType(localStorageValue);
      setMounted(true);
    }
  }, [mounted]);

  const compiledTheme = createTheme(theme);

  if (!mounted) return <div />;

  return (
    <ThemeContext.Provider
      value={{ useDark: dark, theme: theme, toggle: togglePaletteType }}
    >
      <MUIThemeProvider theme={compiledTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
