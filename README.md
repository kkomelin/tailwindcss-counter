# tailwindcss-counter
Tailwind CSS plugin to generate counter utilities

## Installation

```shell_script
npm i tailwindcss-counter
```

## Usage

```javascript
// tailwind.config.js
module.exports = {
  theme: {},
  variants: {},
  plugins: [
    require('tailwindcss-counter')(),
    // Or if you want to set your own counter name:
    // require('tailwindcss-counter')({
    //   counterName: 'yourUniqueCounterName'
    // }),
  ],
};
```

This plugin generates the following utilities:

```css
.counter-reset {
  counter-reset: uniqueCounterName
}
.counter-increment {
  counter-increment: uniqueCounterName 1
}
.counter-decrement {
  counter-increment: uniqueCounterName -1
}
.counter-result {
  content: counter(uniqueCounterName)
}
.after\:counter-result::after {
  content: counter(uniqueCounterName)
}
.before\:counter-result::before {
  content: counter(uniqueCounterName)
}
```

which you can use in your HTML like so:

```html
<div class="counter-reset">
  <div class="after:counter-result">Initial: </div>
  <div class="counter-increment after:counter-result">Incremented: </div>
  <div class="counter-increment after:counter-result">Incremented: </div>
  <div class="counter-increment after:counter-result">Incremented: </div>
  <div class="counter-decrement after:counter-result">Decremented: </div>
  <div class="counter-decrement after:counter-result">Decremented: </div>
  <div class="counter-decrement after:counter-result">Decremented: </div>
  <div class="before:counter-result"> is a result</div>
</div>
```
