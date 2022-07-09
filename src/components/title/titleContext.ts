import React from 'react';

export interface TitleContextType {
  title?: string;
  delimeter?: string;
}

const TitleContext = React.createContext<TitleContextType | null>(null);

export default TitleContext;
