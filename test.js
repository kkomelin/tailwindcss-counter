const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const counterPlugin = require('./index.js');
const { uniqueCounterName } = require('./config.json');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        corePlugins: false,
        plugins: [
          counterPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin creates all necessary utilities and variants', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .counter-reset {
        counter-reset: ${uniqueCounterName}
      }
      .counter-increment {
        counter-increment: ${uniqueCounterName} 1
      }
      .counter-decrement {
        counter-decrement: ${uniqueCounterName} -1
      }
      .counter-result {
        content: counter(${uniqueCounterName})
      }
      .after\\:counter-result::after {
        content: counter(${uniqueCounterName})
      }
      .before\\:counter-result::before {
        content: counter(${uniqueCounterName})
      }
    `);
  });
});
