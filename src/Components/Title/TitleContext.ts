import React from 'react';

export type TitleContextType = {
  siteName: string;
  delim: string;
};

const TitleContext = React.createContext<TitleContextType | null>(null);

export default TitleContext;
