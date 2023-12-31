import { DocumentationConfiguration } from 'types/navigation';

export const documentationConfiguration: DocumentationConfiguration = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Templates',
      href: '/templates',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
        },
      ],
    },
    {
      title: 'Documentation',
      items: [
        {
          title: 'Introduction',
          href: '/docs/documentation',
        },
        {
          title: 'Installation',
          href: '/docs/documentation/installation',
        },
        {
          title: 'Usage',
          href: '/docs/documentation/usage',
        },
        {
          title: 'Commands',
          href: '/docs/documentation/commands',
        },
        /* {
          title: 'Search',
          href: '/docs/in-progress',
          disabled: true,
        }, */
      ],
    },
    /* {
      title: 'Blog',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Build your own',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Writing Posts',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Layouts',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Server Components',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Authentication',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Database with Prisma',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'API Routes',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    },
    {
      title: 'Marketing Site',
      items: [
        {
          title: 'Introduction',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'File Structure',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Tailwind CSS',
          href: '/docs/in-progress',
          disabled: true,
        },
        {
          title: 'Typography',
          href: '/docs/in-progress',
          disabled: true,
        },
      ],
    }, */
  ],
};
