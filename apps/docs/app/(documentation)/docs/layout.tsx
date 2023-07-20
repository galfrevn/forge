import { PropsWithChildren } from 'react';

import { documentationConfiguration } from 'configuration/documentation';
import { DocumentationSidebar } from 'components/documentation/sidebar';

interface DocumentationLayoutProps extends PropsWithChildren {}

export default function DocumentationLayout({ children }: DocumentationLayoutProps) {
  return (
    <div className='flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10'>
      <aside className='fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10'>
        <DocumentationSidebar items={documentationConfiguration.sidebarNav} />
      </aside>
      {children}
    </div>
  );
}
