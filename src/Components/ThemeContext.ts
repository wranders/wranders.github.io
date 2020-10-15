import { ThemeOptions } from '@material-ui/core/styles';
import React from 'react';

export type ThemeContext = {
  useDark: boolean;
  theme: ThemeOptions;
  toggle(): void;
};

const ThemeContext = React.createContext<ThemeContext | null>(null);

export default ThemeContext;
