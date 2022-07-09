import React from 'react';

interface SnackbarContextType {
  pushMessage(message: string): void;
}

const SnackbarContext = React.createContext<SnackbarContextType | null>(null);

export default SnackbarContext;
