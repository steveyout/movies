// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
  videos: '/videos',
  movies: '/movies',
  movie: (id) => `/movie/${id}`,
  watch: (title) => `/watch/${title}`,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/overview'),
    live: path(ROOTS_DASHBOARD, '/live'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  account: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/account/profile'),
    account: path(ROOTS_DASHBOARD, '/account/settings'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  video: {
    root: path(ROOTS_DASHBOARD, '/video'),
    posts: path(ROOTS_DASHBOARD, '/video/posts'),
    new: path(ROOTS_DASHBOARD, '/video/new'),
    live: path(ROOTS_DASHBOARD, '/video/live'),
    view: (title) => path(ROOTS_DASHBOARD, `/video/post/${title}`),
    stream: (title) => path(ROOTS_DASHBOARD, `/video/stream/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  general: {
    app: path(ROOTS_ADMIN, '/overview'),
    ecommerce: path(ROOTS_ADMIN, '/ecommerce'),
    analytics: path(ROOTS_ADMIN, '/analytics'),
    banking: path(ROOTS_ADMIN, '/banking'),
    booking: path(ROOTS_ADMIN, '/booking'),
  },
  //USERS
  users: {
    root: path(ROOTS_ADMIN, '/users'),
    manage: path(ROOTS_ADMIN, '/users/manage'),
  },
  mail: {
    root: path(ROOTS_ADMIN, '/mail'),
    all: path(ROOTS_ADMIN, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_ADMIN, '/chat'),
    new: path(ROOTS_ADMIN, '/chat/new'),
    view: (name) => path(ROOTS_ADMIN, `/chat/${name}`),
  },
  calendar: path(ROOTS_ADMIN, '/calendar'),
  kanban: path(ROOTS_ADMIN, '/kanban'),
  user: {
    root: path(ROOTS_ADMIN, '/user'),
    new: path(ROOTS_ADMIN, '/user/new'),
    list: path(ROOTS_ADMIN, '/user/list'),
    cards: path(ROOTS_ADMIN, '/user/cards'),
    profile: path(ROOTS_ADMIN, '/user/profile'),
    account: path(ROOTS_ADMIN, '/user/account'),
    edit: (name) => path(ROOTS_ADMIN, `/user/${name}/edit`),
    demoEdit: path(ROOTS_ADMIN, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_ADMIN, '/e-commerce'),
    shop: path(ROOTS_ADMIN, '/e-commerce/shop'),
    list: path(ROOTS_ADMIN, '/e-commerce/list'),
    checkout: path(ROOTS_ADMIN, '/e-commerce/checkout'),
    new: path(ROOTS_ADMIN, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_ADMIN, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_ADMIN, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_ADMIN, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_ADMIN, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_ADMIN, '/invoice'),
    list: path(ROOTS_ADMIN, '/invoice/list'),
    new: path(ROOTS_ADMIN, '/invoice/new'),
    view: (id) => path(ROOTS_ADMIN, `/invoice/${id}`),
    edit: (id) => path(ROOTS_ADMIN, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_ADMIN, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_ADMIN, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_ADMIN, '/blog'),
    posts: path(ROOTS_ADMIN, '/blog/posts'),
    new: path(ROOTS_ADMIN, '/blog/new'),
    view: (title) => path(ROOTS_ADMIN, `/blog/post/${title}`),
    demoView: path(ROOTS_ADMIN, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  account: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/account/profile'),
    account: path(ROOTS_DASHBOARD, '/account/settings'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  video: {
    root: path(ROOTS_ADMIN, '/video'),
    posts: path(ROOTS_ADMIN, '/video/posts'),
    new: path(ROOTS_ADMIN, '/video/new'),
    view: (title) => path(ROOTS_ADMIN, `/video/post/${title}`),
    demoView: path(ROOTS_ADMIN, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
