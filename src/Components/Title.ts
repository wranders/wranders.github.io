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

  React.useEffect(() => {
    typeof siteName === 'undefined'
      ? (document.title = pageName)
      : (document.title = [pageName, delim, siteName].join(' '));
  });

  return null;
}
