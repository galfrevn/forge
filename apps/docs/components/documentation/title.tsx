import { Fragment } from 'react';

import { cn } from 'lib/tailwind';

interface DocumentationPageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export function DocumentationPageTitle({
  heading,
  text,
  className,
  ...props
}: DocumentationPageTitleProps) {
  return (
    <Fragment>
      <div className={cn('space-y-4', className)} {...props}>
        <h1 className='inline-block font-semibold text-4xl lg:text-5xl'>{heading}</h1>
        {text && <p className='text-xl text-muted-foreground'>{text}</p>}
      </div>
      <hr className='my-4' />
    </Fragment>
  );
}
