import 'styles/globals.css';

import { PropsWithChildren } from 'react';
import { Outfit as FontSans } from 'next/font/google';

import { cn } from 'lib/tailwind';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

interface RootLayoutProps extends PropsWithChildren {}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <div className='relative flex min-h-screen flex-col'>
          {/* <SiteHeader /> */}
          <div className='flex-1'>{children}</div>
          {/* <SiteFooter /> */}
        </div>
      </body>
    </html>
  );
}
