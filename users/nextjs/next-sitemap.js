const { paths } = require("./src/routes");

const logScreen = (message) => {
  console.log(`[SITEMAP-GENERATOR] ${message}`);
};

const siteUrl = process.env.HOST_FRONTEND || "";
logScreen(`Start generate at HOST: ${siteUrl}`);

module.exports = {
  siteUrl,
  sourceDir: "build",
  sitemapSize: 7000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  additionalPaths: async (config) => {
    const listPaths = [];
    for (let { locale } of paths) {
      const newPathVi = await config.transform(config, locale.vi);
      listPaths.push(newPathVi);
    }
    return listPaths;
  },
};
