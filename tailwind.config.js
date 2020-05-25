const tailwindcssCounter = require('./index')();
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './docs/**/*.html'
  ],
  theme: {
    extend: {},
  },
  variants: {
    width: ['before', 'after'],
    height: ['before', 'after'],
    position: ['before', 'after'],
    backgroundColor: ['before', 'after'],
    borderRadius: ['before', 'after'],
    textColor: ['before', 'after'],
    alignItems: ['before', 'after'],
    flex: ['before', 'after'],
    justifyContent: ['before', 'after'],
    display: ['before', 'after']
  },
  plugins: [
    plugin(tailwindcssCounter),
    plugin(({addVariant, e}) => {
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`
        })
      })
    })
  ],
}
