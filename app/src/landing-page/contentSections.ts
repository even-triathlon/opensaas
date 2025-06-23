import type { NavigationItem } from '../client/components/NavBar/NavBar';
import { routes } from 'wasp/client/router';
import { DocsUrl, BlogUrl } from '../shared/common';
import daBoiAvatar from '../client/static/da-boi.webp';
import avatarPlaceholder from '../client/static/avatar-placeholder.webp';

export const landingPageNavigationItems: NavigationItem[] = [
  { name: 'Horaires', to: '#horaires' },
  { name: 'Inscriptions', to: routes.ContactPageRoute.to },
  { name: 'A Propos', to: routes.AboutUsPageRoute.to },
];
export const features = [  
  {  
    name: 'Natation',  
    description: 'Perfectionne ta technique dans l’eau avec des entraînements adaptés.',  
    icon: '🏊',  
    href: DocsUrl,  
  },  
  {  
    name: 'Cyclisme',  
    description: 'Améliore ton endurance et ta vitesse sur des parcours variés.',  
    icon: '🚴',  
    href: DocsUrl,  
  },  
  {  
    name: 'Course à pied',  
    description: 'Optimise ta foulée et ta performance sur piste ou en nature.',  
    icon: '🏃',  
    href: DocsUrl,  
  },  
  {  
    name: 'Triathlon',  
    description: 'Combine les trois disciplines pour relever de nouveaux défis.',  
    icon: '🏅',  
    href: DocsUrl,  
  },  
];

export const testimonials = [
  {
    name: 'Da Boi',
    role: 'Wasp Mascot',
    avatarSrc: daBoiAvatar,
    socialUrl: 'https://twitter.com/wasplang',
    quote: "I don't even know how to code. I'm just a plushie.",
  },
  {
    name: 'Mr. Foobar',
    role: 'Founder @ Cool Startup',
    avatarSrc: avatarPlaceholder,
    socialUrl: '',
    quote: 'This product makes me cooler than I already am.',
  },
  {
    name: 'Jamie',
    role: 'Happy Customer',
    avatarSrc: avatarPlaceholder,
    socialUrl: '#',
    quote: 'My cats love it!',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Whats the meaning of life?',
    answer: '42.',
    href: 'https://en.wikipedia.org/wiki/42_(number)',
  },
];
export const footerNavigation = {
  app: [
    { name: 'Les Horaires', href: '#horaires' }, // Remplacez par la page des horaires
    { name: 'Les Lieux', href: '#horaires' }, // Remplacez par la page des lieux
  ],
  company: [
  ],
};
