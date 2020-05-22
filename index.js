const { uniqueCounterName } = require('./config.json');

module.exports = function (variants) {
  return function ({ config, addUtilities, addVariant, e }) {
    let newUtilities = {
      '.counter-reset': {
        counterReset: uniqueCounterName,
      },
      '.counter-increment': {
        counterIncrement: `${uniqueCounterName} 1`, 
      },
      '.counter-decrement': {
        counterDecrement: `${uniqueCounterName} -1`, 
      },
    }
    addUtilities(newUtilities)

    newUtilities = {
      '.counter-result': {
          content: `counter(${uniqueCounterName})`,
      }
    }
    addUtilities(newUtilities, config('variants.counter', ['after', 'before']))

    // Add variants for .counter-result.
    addVariant('before', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`before${separator}${className}`)}::before`
      })
    })
    addVariant('after', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`after${separator}${className}`)}::after`
      })
    })
  }
}
