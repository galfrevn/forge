'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import Link from 'next/link';

import { siteConfiguration } from 'configuration/site';
import { documentationConfiguration } from 'configuration/documentation';
import { cn } from 'lib/tailwind';

import { Icons } from 'components/ui/icons';
import { MobileNavigation } from 'components/navigation/mobile';

export function DocumentationHeader() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='flex gap-6 md:gap-10 bg-background'>
      <Link href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>{siteConfiguration.name}</span>
      </Link>
      <nav className='hidden gap-6 md:flex'>
        {documentationConfiguration.mainNav?.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? '#' : item.href}
            className={cn(
              'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
              item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
              item.disabled && 'cursor-not-allowed opacity-80'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <MobileNavigation />
    </div>
  );
}
