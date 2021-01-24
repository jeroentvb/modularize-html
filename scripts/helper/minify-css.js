const postcss = require('postcss')
const cssnano = require('cssnano')

const { CSS_ERROR } = require('../helper/messages')

function minifyCss (css) {
  return new Promise((resolve, _reject) => {
    postcss([cssnano])
      .process(css, { from: undefined, to: undefined })
      .then((minified) => resolve(minified.css))
      .catch((err) => console.error(CSS_ERROR(err)))
  })
}

module.exports = minifyCss
