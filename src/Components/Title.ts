import TitleContext from '@Components/TitleContext';
import { DefaultDelim } from '@Components/TitleProvider';
import React from 'react';

type TitleProps = {
  pageName: string;
};

export default function Title({ pageName }: TitleProps): null {
  const ctx = React.useContext(TitleContext);
  const { delim, siteName } =
    ctx !== null ? ctx : { delim: DefaultDelim, siteName: undefined };

  function GetTitle(): string {
    if (siteName === 'undefined') return pageName;
    return [pageName, delim, siteName].join(' ');
  }

  React.useEffect(() => {
    document.title = GetTitle();
  });

  return null;
}
