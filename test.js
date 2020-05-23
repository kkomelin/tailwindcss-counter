const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const counterPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      {
        ...config,
        corePlugins: false,
        plugins: [
          counterPlugin(pluginOptions),
        ],
      }
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
  const counterName = 'uniqueCounterName';

  return generatePluginCss({}, {counterName})
    .then(css => {
      expect(css).toMatchCss(`
        .counter-reset {
          counter-reset: ${counterName}
        }
        .counter-increment {
          counter-increment: ${counterName} 1
        }
        .counter-decrement {
          counter-increment: ${counterName} -1
        }
        .counter-result {
          content: counter(${counterName})
        }
        .after\\:counter-result::after {
          content: counter(${counterName})
        }
        .before\\:counter-result::before {
          content: counter(${counterName})
        }
      `);
    });
});
