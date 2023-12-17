// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '@/routes/paths';
// components
import { PATH_AFTER_LOGIN } from '@/config';
// components
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Movies',
    icon: <Iconify icon={'material-symbols:home-pin'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Series',
    icon: <Iconify icon={'material-symbols:play-circle-outline-rounded'} {...ICON_SIZE} />,
    path: PATH_PAGE.videos,
  },
  {
    title: 'Asian',
    icon: <Iconify icon={'fluent:movies-and-tv-20-regular'} {...ICON_SIZE} />,
    path: PATH_PAGE.movies,
  },
  {
    title: 'About Us',
    icon: <Iconify icon={'mdi:about-circle-outline'} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  /*
  {
    title: 'Services',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    children: [
      {
        subheader: process.env.TITLE,
        items: [
          { title: 'About us', path: PATH_PAGE.about },
          { title: 'Contact us', path: PATH_PAGE.contact },
          { title: 'FAQs', path: PATH_PAGE.faqs },
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Payment', path: PATH_PAGE.payment },
          { title: 'Maintenance', path: PATH_PAGE.maintenance },
          { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
        ],
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_AUTH.loginUnprotected },
          { title: 'Register', path: PATH_AUTH.registerUnprotected },
          { title: 'Reset password', path: PATH_AUTH.resetPassword },
          { title: 'Verify code', path: PATH_AUTH.verify },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 404', path: PATH_PAGE.page404 },
          { title: 'Page 500', path: PATH_PAGE.page500 },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
   */
  {
    title: 'Contact Us',
    icon: <Iconify icon={'ion:chatbox-ellipses-outline'} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },
];

export default menuConfig;
