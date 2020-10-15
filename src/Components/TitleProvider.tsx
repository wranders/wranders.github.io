import React from 'react';
import TitleContext from '@Components/TitleContext';

export const DefaultDelim = '|';

type TitleProviderProps = {
  children?: React.ReactNode | Array<React.ReactNode>;
  delim?: string;
  siteName: string;
};

export default function TitleProvider({
  children,
  delim,
  siteName,
}: TitleProviderProps): React.ReactElement {
  if (typeof delim === 'undefined') delim = DefaultDelim;
  return (
    <TitleContext.Provider value={{ delim: delim, siteName: siteName }}>
      {children}
    </TitleContext.Provider>
  );
}
