// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// ----------------------------------------------------------------------
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  videos: '/videos',
  movies: '/movies',
  series: '/tv',
  movie: (id) => `/movie/${id}`,
  tv: (id) => `/tv/${id}`,
};
