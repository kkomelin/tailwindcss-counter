module.exports = function (options = {}) {

  const counterName = options.counterName ? options.counterName : `cnt${(new Date()).getTime()}`

  return function ({ config, addUtilities, addVariant, e }) {
    let newUtilities = {
      '.counter-reset': {
        counterReset: counterName,
      },
      '.counter-increment': {
        counterIncrement: `${counterName} 1`, 
      },
      '.counter-decrement': {
        counterIncrement: `${counterName} -1`, 
      },
    }
    addUtilities(newUtilities)

    newUtilities = {
      '.counter-result': {
          content: `counter(${counterName})`,
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
