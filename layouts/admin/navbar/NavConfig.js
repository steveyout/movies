// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  users: getIcon('ic_users'),
  communication: getIcon('ic_communication'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
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
      { title: 'dashboard', path: PATH_ADMIN.general.app, icon: ICONS.dashboard },
      { title: 'live', path: PATH_ADMIN.general.ecommerce, icon: ICONS.live },
      { title: 'trending', path: PATH_ADMIN.general.analytics, icon: ICONS.analytics },
      { title: 'premium', path: PATH_ADMIN.general.banking, icon: ICONS.banking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      //users
      {
        title: 'users',
        path: PATH_ADMIN.users.root,
        icon: ICONS.users,
        children: [
          { title: 'Manage users', path: PATH_ADMIN.users.manage },
          // { title: 'upload new', path: PATH_ADMIN.video.new },
        ],
      },
      // videos
      {
        title: 'videos',
        path: PATH_ADMIN.video.root,
        icon: ICONS.videos,
        children: [
          { title: 'Manage videos', path: PATH_ADMIN.video.posts },
          { title: 'Approve', path: PATH_ADMIN.video.new },
        ],
      },
      ///communication
      {
        title: 'communication',
        path: PATH_ADMIN.video.root,
        icon: ICONS.communication,
        children: [
          { title: 'News letter', path: PATH_ADMIN.video.posts },
          { title: 'push notifications', path: PATH_ADMIN.video.new },
          { title: 'alerts', path: PATH_ADMIN.video.new },
        ],
      },
      // USER
      {
        title: 'settings',
        path: PATH_ADMIN.account.root,
        icon: ICONS.settings,
        children: [
          { title: 'seo', path: PATH_ADMIN.account.profile },
          { title: 'cards', path: PATH_ADMIN.account.cards },
          { title: 'list', path: PATH_ADMIN.account.list },
          { title: 'create', path: PATH_ADMIN.account.new },
          { title: 'edit', path: PATH_ADMIN.account.demoEdit },
          { title: 'account', path: PATH_ADMIN.account.account },
        ],
      },

      // plans
      {
        title: 'plans',
        path: PATH_ADMIN.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_ADMIN.eCommerce.shop },
          { title: 'product', path: PATH_ADMIN.eCommerce.demoView },
          { title: 'list', path: PATH_ADMIN.eCommerce.list },
          { title: 'create', path: PATH_ADMIN.eCommerce.new },
          { title: 'edit', path: PATH_ADMIN.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_ADMIN.eCommerce.checkout },
        ],
      },

      // earnings
      {
        title: 'Earnings',
        path: PATH_ADMIN.invoice.root,
        icon: ICONS.earning,
        children: [
          { title: 'list', path: PATH_ADMIN.invoice.list },
          { title: 'details', path: PATH_ADMIN.invoice.demoView },
          { title: 'create', path: PATH_ADMIN.invoice.new },
          { title: 'edit', path: PATH_ADMIN.invoice.demoEdit },
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
        path: PATH_ADMIN.chat.root,
        icon: ICONS.chat,
        info: (
          <Label variant="outlined" color="info">
            +32
          </Label>
        ),
      },
      {
        title: 'notifications',
        path: PATH_ADMIN.chat.root,
        icon: ICONS.notification,
        info: (
          <Label variant="outlined" color="secondary">
            +32
          </Label>
        ),
      },
      {
        title: 'help',
        path: PATH_ADMIN.mail.root,
        icon: ICONS.help,
      },
      { title: 'contact us', path: PATH_ADMIN.calendar, icon: ICONS.contact },
      { title: 'faqs', path: PATH_ADMIN.kanban, icon: ICONS.faq },
    ],
  },
];

export default navConfig;
