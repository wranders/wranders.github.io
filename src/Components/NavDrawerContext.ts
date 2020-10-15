import React from 'react';

export type NavDrawerContext = {
  open: boolean;
  toggle(): void;
};

const ctx = React.createContext<NavDrawerContext | null>(null);

export const NavDrawerContextConsumer = ctx.Consumer;

export const NavDrawerContextProvider = ctx.Provider;
