import React from 'react';

export interface NavigationDrawerContextType {
  open: boolean;
  toggle(): void;
}

const NavigationDrawerContext =
  React.createContext<NavigationDrawerContextType | null>(null);

export default NavigationDrawerContext;
