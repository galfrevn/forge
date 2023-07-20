'use client';

import { useState, PropsWithChildren } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import Link from 'next/link';
import { MainNavItem } from 'types/navigation';

import { siteConfiguration } from 'configuration/site';
import { cn } from 'lib/tailwind';

import { Icons } from 'components/ui/icons';
import { MobileNavigation } from 'components/navigation/mobile';

interface DocumentationHeaderProps extends PropsWithChildren {
  items?: MainNavItem[];
}

export function DocumentationHeader({ items, children }: DocumentationHeaderProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className='flex gap-6 md:gap-10 bg-white'>
      <Link href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>{siteConfiguration.name}</span>
      </Link>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
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
      ) : null}
      <button
        className='flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className='font-bold'>Menu</span>
      </button>
      {showMobileMenu && items && <MobileNavigation items={items}>{children}</MobileNavigation>}
    </div>
  );
}
