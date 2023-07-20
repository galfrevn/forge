import { Icons } from 'components/ui/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

export type SiteConfiguration = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocumentationConfiguration = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfiguration = {
  mainNav: MainNavItem[];
};

export type DashboardConfiguration = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
