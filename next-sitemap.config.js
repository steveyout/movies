module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.youplex.site',
  generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://www.youplex.site/server-sitemap.xml`, // <==== Add here
    ],
  },
};
