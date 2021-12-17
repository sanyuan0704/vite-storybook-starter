const resolve = require('resolve')
const path = require('path');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "storybook-builder-vite"
  },
  async viteFinal(config) {
    // customize the Vite config here
    // https://github.com/eirslett/storybook-builder-vite/issues/55
    config.optimizeDeps.include = config.optimizeDeps.include.filter(
      item => !item.includes('vue')
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      path: 'path-browserify'
    };
    config.optimizeDeps.include.push(
      '@storybook/theming',
      'path-browserify',
      '@storybook/addon-docs > @storybook/components > react-syntax-highlighter > refractor/core'
    );
    config.resolve.preserveSymlinks = false;
    config.optimizeDeps.exclude = ['crypto'];
    return config;
  }
}