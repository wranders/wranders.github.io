import React from 'react';
import { DefaultDelimeter } from './title';
import TitleContext, { TitleContextType } from './titleContext';

interface TitleProviderProps extends TitleContextType {
  children?: React.ReactNode | Array<React.ReactNode>;
}

export default function TitleProvider({
  children,
  delimeter,
  title,
}: TitleProviderProps): React.ReactElement {
  if (typeof delimeter === 'undefined') delimeter = DefaultDelimeter;

  return (
    <TitleContext.Provider value={{ delimeter: delimeter, title: title }}>
      {children}
    </TitleContext.Provider>
  );
}
