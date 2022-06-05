import { ThemeOptions } from '@material-ui/core/styles';
import React from 'react';

export type ThemeContextType = {
  useDark: boolean;
  theme: ThemeOptions;
  toggle(): void;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export default ThemeContext;
