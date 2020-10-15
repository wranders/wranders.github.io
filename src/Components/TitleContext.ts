import React from 'react';

export type TitleContext = {
  siteName: string;
  delim: string;
};

const TitleContext = React.createContext<TitleContext | null>(null);

export default TitleContext;
