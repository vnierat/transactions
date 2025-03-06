import { routes } from '../../../../config/consts';

const sidebarItems = [
  [
    {
      label: 'Overview',
      link: routes.home,
    },
    {
      label: 'Transactions (3)',
      link: routes.transactions,
    },
  ],
  [
    {
      label: 'Transfers (2)',
      link: '/transfers',
    },
    {
      label: 'Invoices (1)',
      link: '/invoices',
    },
  ],
  [
    {
      label: 'Manage cards',
      link: '/manage_cards',
    },
    {
      label: 'Manage accounts',
      link: '/manage_accounts',
    },
  ],
  [
    {
      label: 'Team',
      link: '/team',
    },
    {
      label: 'Integrations',
      link: '/integrations',
    },
    {
      label: 'Settings',
      link: '/settings',
    },
  ],
];

export default sidebarItems;
