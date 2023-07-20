import Link from 'next/link';
import { Doc } from 'contentlayer/generated';

import { documentationConfiguration } from 'configuration/documentation';
import { cn } from 'lib/tailwind';

import { buttonVariants } from 'components/ui/button';
import { Icons } from 'components/ui/icons';

interface DocumentationPagerProps {
  doc: Doc;
}

export function DocumentationPager({ doc }: DocumentationPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) return null;

  return (
    <div className='flex flex-row items-center justify-between'>
      {pager?.prev && (
        <Link href={pager.prev.href} className={cn(buttonVariants({ variant: 'ghost' }))}>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: 'ghost' }), 'ml-auto')}
        >
          {pager.next.title}
          <Icons.chevronRight className='ml-2 h-4 w-4' />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(documentationConfiguration.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex((link) => doc.slug === link?.href);
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: { items? }[]) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link);
  }, []);
}
