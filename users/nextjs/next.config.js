const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");
const nextRuntimeDotenv = require("next-runtime-dotenv");
const { routes } = require("./src/routes");
const { i18n } = require("./next-i18next.config");

const withConfig = nextRuntimeDotenv({
  public: ["API_URL", "API_KEY", "GRAPHQL_URL", "PORT", "HOST_FRONTEND"],
});

const nextConfig = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  experimental: {
    modern: true,
  },
  onDemandEntries: {
    maxInactiveAge: 120 * 1e3,
    pagesBufferLength: 3,
  },
  publicRuntimeConfig: {
    PROXY_MODE: process.env.PROXY_MODE,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    STATIC_PATH: process.env.STATIC_PATH,
  },
  experimental: {
    modern: true,
  },
  poweredByHeader: true,
  distDir: "build",
  onDemandEntries: {
    maxInactiveAge: 120 * 1e3, // default 25s
    pagesBufferLength: 3, // default 2
  },
  i18n,
  generateBuildId: async () => {
    return "USER_TUYEN_DUNG_VN";
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    if (!isServer) {
      // config.node = { fs: "empty", module: "empty" };
    }
    return config;
  },
  async rewrites() {
    return routes;
  },
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
    HOST_FRONTEND: process.env.HOST_FRONTEND,
    NEXT_PUBLIC_HOST_FRONTEND: process.env.NEXT_PUBLIC_HOST_FRONTEND,
  },
};

module.exports = withConfig(withPlugins([[withCSS, withSASS], [nextConfig]]));
