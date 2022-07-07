import React from 'react';

export type SnackBarContextType = {
  pushMessage(message: string): void;
};

const SnackbarContext = React.createContext<SnackBarContextType | null>(null);

export default SnackbarContext;
