const fs = require('fs-extra')
const Terser = require('terser')
const postcss = require('postcss')
const cssnano = require('cssnano')

const {
  JS_NOT_MINIFIED,
  MINIFIED_JS,
  CSS_NOT_MINIFIED,
  MINIFIED_CSS,
  CSS_ERROR
} = require('./messages')
const { CONFIG, ASSETS_FOLDER_JS, ASSETS_FOLDER_CSS, SRC_ASSETS_FOLDER } = require('../helper/paths')

const config = require(CONFIG)

function js () {
  if (!config.build.minify.js) return console.log(JS_NOT_MINIFIED)

  fs.readdir(`${SRC_ASSETS_FOLDER}/js`, (err, files) => {
    files.forEach(file => {
      if (err) throw new Error(err)
      if (!fs.existsSync(ASSETS_FOLDER_JS)) fs.mkdirSync(ASSETS_FOLDER_JS)

      fs.readFile(`${SRC_ASSETS_FOLDER}/js/${file}`, 'utf8', (err, data) => {
        if (err) throw new Error(err)

        const code = Terser.minify(data)

        fs.writeFile(`${ASSETS_FOLDER_JS}/${file}`, code.code, err => {
          if (err) {
            console.error(err)
          } else {
            console.log(MINIFIED_JS)
          }
        })
      })
    })
  })
}

function css () {
  if (!config.build.minify.css) return console.log(CSS_NOT_MINIFIED)

  fs.readdir('./src/assets/css', (err, files) => {
    if (err) throw new Error(err)
    if (!fs.existsSync(ASSETS_FOLDER_CSS)) fs.mkdirSync(ASSETS_FOLDER_CSS)

    files = files.filter(file => file.slice(-4) === '.css')

    files.forEach(file => {
      fs.readFile(`./src/assets/css/${file}`, 'utf8', (err, css) => {
        if (err) throw new Error(err)

        postcss([cssnano])
          .process(css, { from: undefined, to: undefined })
          .then(result => fs.writeFile(`${ASSETS_FOLDER_CSS}/${file}`, result.css, () => true))
          .then(() => console.log(MINIFIED_CSS))
          .catch(err => console.error(CSS_ERROR(err)))
      })
    })
  })
}

module.exports = {
  js,
  css
}
