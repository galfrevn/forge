import Link from 'next/link';

import { cn } from 'lib/tailwind';
import { buttonVariants } from 'components/ui/button';

import { DocumentationHeader } from 'components/documentation/header';
import { DocumentationFooter } from 'components/documentation/footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className=' z-40 bg-background border-b'>
        <div className='container flex h-14 items-center justify-between py-6'>
          <DocumentationHeader />
          <nav>
            <Link
              href='/templates/add'
              className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}
            >
              Create your template
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <DocumentationFooter />
    </div>
  );
}
