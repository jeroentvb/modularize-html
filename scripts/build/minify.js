const fs = require('fs-extra')
const terser = require('terser')

const { readDir, readFile, writeFile } = require('../helper/fs-wrapper')
const minifyCss = require('../helper/minify-css')
const sass = require('../helper/sass')

const {
  JS_NOT_MINIFIED,
  MINIFIED_JS,
  CSS_NOT_MINIFIED,
  MINIFIED_CSS
} = require('../helper/messages')
const { CONFIG, ASSETS_FOLDER_JS, ASSETS_FOLDER_CSS, SRC_ASSETS_FOLDER } = require('../helper/paths')

const config = require(CONFIG)

async function js () {
  if (!config.build.minify.js) return console.log(JS_NOT_MINIFIED)

  try {
    if (!fs.existsSync(ASSETS_FOLDER_JS)) fs.mkdirSync(ASSETS_FOLDER_JS)

    const files = await readDir(`${SRC_ASSETS_FOLDER}/js`)

    await Promise.all(files.map(async (file) => {
      const fileContents = await readFile(`${SRC_ASSETS_FOLDER}/js/${file}`)

      const { code } = await terser.minify(fileContents)

      await writeFile(`${ASSETS_FOLDER_JS}/${file}`, code)
    }))

    console.log(MINIFIED_JS)
  } catch (err) {
    throw err
  }
}

async function css () {
  if (!config.build.minify.css) return console.log(CSS_NOT_MINIFIED)
  if (config.sass) sass.compile(true)

  try {
    if (!fs.existsSync(ASSETS_FOLDER_CSS)) fs.mkdirSync(ASSETS_FOLDER_CSS)

    const files = await readDir(`${SRC_ASSETS_FOLDER}/css`)
    const fileNames = files.filter(file => file.slice(-4) === '.css')

    await Promise.all(fileNames.map(async (file) => {
      const fileContents = await readFile(`${SRC_ASSETS_FOLDER}/css/${file}`)

      const minfiedCss = await minifyCss(fileContents)

      await writeFile(`${ASSETS_FOLDER_CSS}/${file}`, minfiedCss)

      console.log(MINIFIED_CSS)
    }))
  } catch (err) {
    throw err
  }
}

module.exports = {
  js,
  css
}
