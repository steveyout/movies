module.exports = {
  siteUrl: process.env.SITE_URL || 'https://youplex.site',
  generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://youplex.site/server-sitemap.xml`, // <==== Add here
    ],
  },
};
