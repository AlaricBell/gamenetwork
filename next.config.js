const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withImages(withSass({
  env: {
    ANY_ENV_KEY: "ANY_ENV_VARIABLE",
  },
})));

module.exports = {
  images: {
    domains: ['avatar-cdn.tracker.gg', 'trackercdn.com'],
  },
}