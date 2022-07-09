import React from 'react';
import TitleContext, { TitleContextType } from './titleContext';

export const DefaultDelimeter = '|';

interface TitleProps {
  pageName: string;
}

export default function Title({ pageName }: TitleProps): null {
  const titleCtx = React.useContext(TitleContext);
  const { delimeter, title }: TitleContextType =
    titleCtx !== null
      ? titleCtx
      : { delimeter: DefaultDelimeter, title: undefined };

  function getTitle(): string {
    if (typeof title === 'undefined') return pageName;
    return [pageName, delimeter, title].join(' ');
  }

  React.useEffect(() => {
    document.title = getTitle();
  });

  return null;
}
