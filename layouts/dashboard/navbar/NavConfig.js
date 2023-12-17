// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_trophy'),
  dashboard: getIcon('ic_dashboard'),
  settings: getIcon('settings-line'),
  videos: getIcon('video-camera-line'),
  premium: getIcon('premium-20-regular'),
  live: getIcon('round-live-tv'),
  earning: getIcon('money-bag'),
  notification: getIcon('notifications-outline'),
  faq: getIcon('faq'),
  contact: getIcon('contact-support-outline'),
  help: getIcon('help-line'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'live', path: PATH_DASHBOARD.general.live, icon: ICONS.live },
      { title: 'premium', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'tournaments', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // videos
      {
        title: 'videos',
        path: PATH_DASHBOARD.video.root,
        icon: ICONS.videos,
        children: [
          { title: 'My uploads', path: PATH_DASHBOARD.video.posts },
          { title: 'upload new', path: PATH_DASHBOARD.video.new },
          { title: 'Go live', path: PATH_DASHBOARD.video.live },
        ],
      },
      // USER
      {
        title: 'settings',
        path: PATH_DASHBOARD.account.root,
        icon: ICONS.settings,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.account.profile },
          { title: 'account', path: PATH_DASHBOARD.account.account },
        ],
      },

      // plans
      {
        title: 'plans',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'vip', path: PATH_DASHBOARD.eCommerce.shop },
          //
        ],
      },

      // earnings
      {
        title: 'Earnings',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.earning,
        children: [
          { title: 'overview', path: PATH_DASHBOARD.invoice.list },
          { title: 'withdraw', path: PATH_DASHBOARD.invoice.demoView },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'more',
    items: [
      {
        title: 'chats',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
        info: <Badge color="primary" variant="dot" />,
      },
      {
        title: 'notifications',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.notification,
        info: <Badge color="secondary" variant="dot" />,
      },
      {
        title: 'help',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.help,
      },
      { title: 'contact us', path: PATH_DASHBOARD.calendar, icon: ICONS.contact },
      { title: 'faqs', path: PATH_DASHBOARD.kanban, icon: ICONS.faq },
    ],
  },
];

export default navConfig;
