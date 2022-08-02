const rootMain = require('../../../.storybook/main')

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [...rootMain.addons, '@storybook/addon-links', '@storybook/addon-a11y', '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType })
    }

    // Polyfill to avoid runtime error `Reflect.metadata is not a function`
    config.entry.unshift('reflect-metadata')

    return config
  }
}
