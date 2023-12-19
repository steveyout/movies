module.exports = {
  siteUrl: process.env.SITE_URL || 'https://movies.youplex.live',
  generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://movies.youplex.live/server-sitemap.xml`, // <==== Add here
    ],
  },
};
