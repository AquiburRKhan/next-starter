// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  env: {
    production: false,
    envName: 'local',
    lang: 'en',
    api: ''
  }
});
