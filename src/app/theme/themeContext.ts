import { ThemeOptions } from '@mui/material';
import React from 'react';

interface ThemeContextType {
  useDark: boolean;
  theme: ThemeOptions;
  toggle(): void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export default ThemeContext;
