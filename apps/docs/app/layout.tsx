import 'styles/globals.css';

import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Outfit as FontSans } from 'next/font/google';

import { cn } from 'lib/tailwind';
import { siteConfiguration } from 'configuration/site';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: siteConfiguration.name,
  description: siteConfiguration.description,
  themeColor: siteConfiguration.themeColor,
};

interface RootLayoutProps extends PropsWithChildren {}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn('min-h-screen bg-background font-sans antialiased dark scrollbar-thin', fontSans.variable)}
      >
        <div className='relative flex min-h-screen flex-col'>
          {/* <SiteHeader /> */}
          <div className='flex-1'>{children}</div>
          {/* <SiteFooter /> */}
        </div>
      </body>
    </html>
  );
}
