import { PropsWithChildren } from 'react';

import Link from 'next/link';

import { siteConfiguration } from 'configuration/site';

import { Icons } from 'components/ui/icons';
import { Button } from 'components/ui/button';

import { DocumentationHeader } from 'components/documentation/header';
import { DocumentationSearch } from 'components/documentation/search';
import { DocumentationFooter } from 'components/documentation/footer';

interface DocumentationLayoutProps extends PropsWithChildren {}

export default function DocumentationLayout({ children }: DocumentationLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-40 w-full border-b bg-background'>
        <div className='container bg-background flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0'>
          <DocumentationHeader />
          <div className='flex flex-1 items-center space-x-4 sm:justify-end'>
            <div className='flex-1 sm:grow-0'>
              <DocumentationSearch />
            </div>
            <nav className='flex space-x-4'>
              <Button variant='outline' size='icon'>
                <Link href={siteConfiguration.links.github} target='_blank' rel='noreferrer'>
                  <Icons.gitHub className='h-4 w-4' />
                  <span className='sr-only'>GitHub</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className='container flex-1'>{children}</div>
      <DocumentationFooter className='border-t' />
    </div>
  );
}
