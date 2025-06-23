import type { NavigationItem } from '../NavBar/NavBar';
import { routes } from 'wasp/client/router';
import { BlogUrl, DocsUrl } from '../../../shared/common';

export const appNavigationItems: NavigationItem[] = [
  { name: 'Horaires', to: '/#horaires' },
  { name: 'Inscriptions', to: routes.ContactPageRoute.to },
  { name: 'A Propos', to: routes.AboutUsPageRoute.to },
];
