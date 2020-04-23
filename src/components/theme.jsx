import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { green, red } from '@material-ui/core/colors';

const themeObject = {
  mixins: {
    denseToolbar: {
        minHeight: 48
    }
  },
  palette: {
    primary: green,
    secondary: red,
    type: 'light'
  }
}

const ThemeContext = React.createContext({
  useDark: false,
  theme: themeObject,
  toggle: () => {}
});

const localStorageKeyUseDarkMode = 'themeDarkMode';

const withMediaQuery = (...args) => Component => props => {
  const mediaQuery = useMediaQuery(...args);
  return <Component mediaQuery={mediaQuery} {...props} />;
}

class ThemeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themeObject,
      useDark: false,
      mounted: false
    }
    this.setPalettType = this.setPalettType.bind(this);
    this.togglePaletteType = this.togglePaletteType.bind(this);
  }

  componentDidMount() {
    const lsDark = localStorage.getItem(localStorageKeyUseDarkMode);
    const { mediaQuery } = this.props;
    if (lsDark === null) {
      this.setState({useDark: mediaQuery, mounted: true}, () => {
        this.setPalettType(mediaQuery);
      });
    } else {
      const lsVal = lsDark === 'true';
      this.setState({useDark: lsVal, mounted: true}, () => {
        this.setPalettType(lsVal);
      });
    }
  }

  setPalettType(useDark) {
    const { theme } = this.state;
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: (useDark === true) ? 'dark' : 'light'
      }
    }
    this.setState({ theme: updatedTheme, useDark: useDark}, () => {
      localStorage.setItem(
        localStorageKeyUseDarkMode,
        JSON.stringify(useDark)
      );
    });
  }

  togglePaletteType() {
    const { theme } = this.state;
    const { palette: { type }} = theme;
    const useDark = type === 'light';
    this.setPalettType(useDark);
  }

  render() {
    const { useDark, theme, mounted } = this.state;
    const compiledTheme = createMuiTheme(theme);
    if (!mounted) {
      return <div/>
    }
    return (
      <ThemeContext.Provider value={{
        useDark: useDark, theme: theme, toggle: this.togglePaletteType
      }}>
        <ThemeProvider theme={compiledTheme}>
          <CssBaseline />
          {this.props.children}
        </ThemeProvider>
      </ThemeContext.Provider>
    )
  }
}

ThemeWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  mediaQuery: PropTypes.bool
}

export default withMediaQuery('(prefers-color-scheme: dark)')(ThemeWrapper);
export { ThemeContext };